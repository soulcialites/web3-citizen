pragma solidity ^0.8.13;
// SPDX-License-Identifier: MIT

import "./TypesAndDecoders.sol";
import "./caveat-enforcers/CaveatEnforcer.sol";

abstract contract Delegatable is EIP712Decoder {
  event DelegationTriggered(address principal, address indexed agent);

  bytes32 public immutable domainHash;

  constructor(string memory contractName, string memory version) {
    domainHash = getEIP712DomainHash(contractName, version, block.chainid, address(this));
  }

  // Allows external signers to submit batches of signed invocations for processing.
  function invoke(SignedInvocation[] calldata signedInvocations) public returns (bool success) {
    for (uint256 i = 0; i < signedInvocations.length; i++) {
      SignedInvocation calldata signedInvocation = signedInvocations[i];
      address invocationSigner = verifyInvocationSignature(signedInvocation);
      enforceReplayProtection(invocationSigner, signedInvocations[i].invocations.replayProtection);
      _invoke(signedInvocation.invocations.batch, invocationSigner);
    }
  }

  // Allows external contracts to submit batches of invocations for processing.
  function contractInvoke(Invocation[] calldata batch) public returns (bool) {
    return _invoke(batch, msg.sender);
  }

  function _invoke(Invocation[] calldata batch, address sender) private returns (bool success) {
    for (uint256 x = 0; x < batch.length; x++) {
      Invocation memory invocation = batch[x];
      address intendedSender;
      address canGrant;

      // If there are no delegations, this invocation comes from the signer
      if (invocation.authority.length == 0) {
        intendedSender = sender;
        canGrant = intendedSender;
      }

      bytes32 authHash = 0x0;

      for (uint256 d = 0; d < invocation.authority.length; d++) {
        SignedDelegation memory signedDelegation = invocation.authority[d];
        address delegationSigner = verifyDelegationSignature(signedDelegation);

        // Implied sending account is the signer of the first delegation
        if (d == 0) {
          intendedSender = delegationSigner;
          canGrant = intendedSender;
        }

        require(delegationSigner == canGrant, "Delegation signer does not match required signer");

        Delegation memory delegation = signedDelegation.delegation;
        require(
          delegation.authority == authHash,
          "Delegation authority does not match previous delegation"
        );

        // TODO: maybe delegations should have replay protection, at least a nonce (non order dependent),
        // otherwise once it's revoked, you can't give the exact same permission again.
        bytes32 delegationHash = GET_SIGNEDDELEGATION_PACKETHASH(signedDelegation);

        // Each delegation can include any number of caveats.
        // A caveat is any condition that may reject a proposed transaction.
        // The caveats specify an external contract that is passed the proposed tx,
        // As well as some extra terms that are used to parameterize the enforcer.
        for (uint16 y = 0; y < delegation.caveats.length; y++) {
          CaveatEnforcer enforcer = CaveatEnforcer(delegation.caveats[y].enforcer);
          bool caveatSuccess = enforcer.enforceCaveat(
            delegation.caveats[y].terms,
            invocation.transaction,
            delegationHash
          );
          require(caveatSuccess, "Caveat rejected");
        }

        // Store the hash of this delegation in `authHash`
        // That way the next delegation can be verified against it.
        authHash = delegationHash;
        canGrant = delegation.delegate;
      }

      // Here we perform the requested invocation.
      Transaction memory transaction = invocation.transaction;

      require(transaction.to == address(this), "Invocation target does not match");
      emit DelegationTriggered(intendedSender, sender);
      success = execute(transaction.to, transaction.data, transaction.gasLimit, intendedSender);
      require(success, "Delegator execution failed");
    }
  }

  mapping(address => mapping(uint256 => uint256)) public multiNonce;

  function enforceReplayProtection(address intendedSender, ReplayProtection memory protection)
    private
  {
    uint256 queue = protection.queue;
    uint256 nonce = protection.nonce;
    require(
      nonce == (multiNonce[intendedSender][queue] + 1),
      "One-at-a-time order enforced. Nonce2 is too small"
    );
    multiNonce[intendedSender][queue] = nonce;
  }

  function execute(
    address to,
    bytes memory data,
    uint256 gasLimit,
    address sender
  ) internal returns (bool success) {
    bytes memory full = abi.encodePacked(data, sender);
    assembly {
      success := call(gasLimit, to, 0, add(full, 0x20), mload(full), 0, 0)
    }
  }

  function verifyInvocationSignature(SignedInvocation memory signedInvocation)
    public
    view
    returns (address)
  {
    bytes32 sigHash = getInvocationsTypedDataHash(signedInvocation.invocations);
    address recoveredSignatureSigner = recover(sigHash, signedInvocation.signature);
    return recoveredSignatureSigner;
  }

  function verifyDelegationSignature(SignedDelegation memory signedDelegation)
    public
    view
    returns (address)
  {
    Delegation memory delegation = signedDelegation.delegation;
    bytes32 sigHash = getDelegationTypedDataHash(delegation);
    address recoveredSignatureSigner = recover(sigHash, signedDelegation.signature);
    return recoveredSignatureSigner;
  }

  function getDelegationTypedDataHash(Delegation memory delegation) public view returns (bytes32) {
    bytes32 digest = keccak256(
      abi.encodePacked("\x19\x01", domainHash, GET_DELEGATION_PACKETHASH(delegation))
    );
    return digest;
  }

  function getInvocationsTypedDataHash(Invocations memory invocations)
    public
    view
    returns (bytes32)
  {
    bytes32 digest = keccak256(
      abi.encodePacked("\x19\x01", domainHash, GET_INVOCATIONS_PACKETHASH(invocations))
    );
    return digest;
  }

  function getEIP712DomainHash(
    string memory contractName,
    string memory version,
    uint256 chainId,
    address verifyingContract
  ) public pure returns (bytes32) {
    bytes memory encoded = abi.encode(
      EIP712DOMAIN_TYPEHASH,
      keccak256(bytes(contractName)),
      keccak256(bytes(version)),
      chainId,
      verifyingContract
    );
    return keccak256(encoded);
  }

  function _msgSender() internal view virtual returns (address sender) {
    if (msg.sender == address(this)) {
      bytes memory array = msg.data;
      uint256 index = msg.data.length;
      assembly {
        // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
        sender := and(mload(add(array, index)), 0xffffffffffffffffffffffffffffffffffffffff)
      }
    } else {
      sender = msg.sender;
    }
    return sender;
  }
}
