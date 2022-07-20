import { utils } from 'ethers';
import { createElement } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useContractWrite, useContractRead, erc20ABI, useAccount } from 'wagmi';

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

var MintableERC20_ABI = [
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol",
				type: "string"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "subtractedValue",
				type: "uint256"
			}
		],
		name: "decreaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "addedValue",
				type: "uint256"
			}
		],
		name: "increaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "mint",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

function useERC20ContractRead(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: MintableERC20_ABI
  }, method, {
    args: args
  });
}

var InputWithLabel = function InputWithLabel(_ref) {
  var className = _ref.className,
      name = _ref.name,
      label = _ref.label,
      register = _ref.register,
      _ref$required = _ref.required,
      required = _ref$required === void 0 ? false : _ref$required,
      placeholder = _ref.placeholder,
      type = _ref.type;
  var containerClassName = classNames(className, 'InputWithLabel');
  return createElement("div", {
    className: containerClassName
  }, createElement("div", {
    className: "flex items-center justify-center"
  }, createElement("input", Object.assign({
    className: "input",
    type: type,
    placeholder: placeholder
  }, register(name, {
    required: required
  }))), createElement("label", {
    className: "px-3 py-2 bg-emerald-500 text-white text-center rounded-smd ml-2"
  }, createElement("span", {
    className: "uppercase text-xs font-bold"
  }, label))));
};

var ERC20Approve = function ERC20Approve(_ref) {
  var className = _ref.className,
      onUpdate = _ref.onUpdate,
      token = _ref.token;
  var styleForm = classNames(className, 'ERC20Approve');

  var _useForm = useForm({
    defaultValues: {
      to: '',
      amount: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useERC20ContractWrit = useERC20ContractRead(token, 'approve', [watchAllFields == null ? void 0 : watchAllFields.to, utils.parseEther(watchAllFields.amount || '0')]),
      write = _useERC20ContractWrit.write;

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: styleForm
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "mt-4"
  }, createElement(InputWithLabel, {
    name: "to",
    label: "To",
    placeholder: "0x000...000",
    register: register
  }), createElement(InputWithLabel, {
    className: "mt-3",
    name: "amount",
    label: "Amount",
    placeholder: "0.1",
    register: register
  })), createElement("button", {
    className: "button text-white py-2 rounded-lg text-lg px-14 bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-700 w-full mt-6",
    type: "submit"
  }, "Submit")));
};

function useERC20ContractRead$1(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: erc20ABI
  }, method, {
    args: args
  });
}

var ERC20Balance = function ERC20Balance(_ref) {
  var className = _ref.className,
      account = _ref.account,
      token = _ref.token;
  var classes = classNames(className, 'ERC20Balance');

  var _useERC20ContractRead = useERC20ContractRead$1(token, 'balanceOf', [account]),
      data = _useERC20ContractRead.data,
      isError = _useERC20ContractRead.isError,
      isLoading = _useERC20ContractRead.isLoading;

  console.log(data);
  if (isError || isLoading) return null;
  return createElement("div", {
    className: classes
  }, utils.formatEther(data || '0'));
};

var ERC20Mint = function ERC20Mint(_ref) {
  var className = _ref.className,
      onUpdate = _ref.onUpdate,
      token = _ref.token;
  var styleForm = classNames(className, 'ERC20Mint');

  var _useForm = useForm({
    defaultValues: {
      to: '',
      amount: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useERC20ContractWrit = useERC20ContractRead(token, 'mint', [watchAllFields == null ? void 0 : watchAllFields.to, utils.parseEther(watchAllFields.amount || '0')]),
      write = _useERC20ContractWrit.write;

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: styleForm
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "mt-4"
  }, createElement(InputWithLabel, {
    name: "to",
    label: "To",
    placeholder: "0x000...000",
    register: register
  }), createElement(InputWithLabel, {
    className: "mt-3",
    name: "amount",
    label: "Amount",
    placeholder: "0.1",
    register: register
  })), createElement("button", {
    className: "button text-white py-2 rounded-lg text-lg px-14 bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-700 w-full mt-6",
    type: "submit"
  }, "Submit")));
};

var ERC20Transfer = function ERC20Transfer(_ref) {
  var className = _ref.className,
      onUpdate = _ref.onUpdate,
      token = _ref.token;
  var styleForm = classNames(className, 'ERC20Transfer');

  var _useForm = useForm({
    defaultValues: {
      to: '',
      amount: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useERC20ContractWrit = useERC20ContractRead(token, 'transfer', [watchAllFields == null ? void 0 : watchAllFields.to, utils.parseEther(watchAllFields.amount || '0')]),
      write = _useERC20ContractWrit.write;

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: styleForm
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "mt-4"
  }, createElement(InputWithLabel, {
    name: "to",
    label: "To",
    placeholder: "0x000...000",
    register: register
  }), createElement(InputWithLabel, {
    className: "mt-3",
    name: "amount",
    label: "Amount",
    placeholder: "0.1",
    register: register
  })), createElement("button", {
    className: "button text-white py-2 rounded-lg text-lg px-14 bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-700 w-full mt-6",
    type: "submit"
  }, "Submit")));
};

var ERC20TransferFrom = function ERC20TransferFrom(_ref) {
  var className = _ref.className,
      onUpdate = _ref.onUpdate,
      token = _ref.token;
  var styleForm = classNames(className, 'ERC20TransferFrom');

  var _useForm = useForm({
    defaultValues: {
      from: '',
      to: '',
      amount: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useERC20ContractWrit = useERC20ContractRead(token, 'transferFrom', [watchAllFields == null ? void 0 : watchAllFields.from, watchAllFields == null ? void 0 : watchAllFields.to, utils.parseEther(watchAllFields.amount || '0')]),
      write = _useERC20ContractWrit.write;

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: styleForm
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "mt-4"
  }, createElement(InputWithLabel, {
    name: "from",
    label: "From",
    placeholder: "0x000...000",
    register: register
  }), createElement(InputWithLabel, {
    className: "mt-3",
    name: "to",
    label: "To",
    placeholder: "0x000...000",
    register: register
  }), createElement(InputWithLabel, {
    className: "mt-3",
    name: "amount",
    label: "Amount",
    placeholder: "0.1",
    register: register
  })), createElement("button", {
    className: "button text-white py-2 rounded-lg text-lg px-14 bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-700 w-full mt-6",
    type: "submit"
  }, "Submit")));
};

var ERC20TotalSupply = function ERC20TotalSupply(_ref) {
  var className = _ref.className,
      contractAddress = _ref.contractAddress;
  var classes = classNames(className, 'ERC20TotalSupply');

  var _useERC20ContractRead = useERC20ContractRead$1(contractAddress, 'totalSupply', []),
      data = _useERC20ContractRead.data,
      isError = _useERC20ContractRead.isError,
      isLoading = _useERC20ContractRead.isLoading;

  if (isError || isLoading) return null;
  return createElement("div", {
    className: classes
  }, utils.formatEther(data || '0'));
};

var WalletERC20Balance = function WalletERC20Balance(_ref) {
  var className = _ref.className,
      token = _ref.token;
  var classes = classNames(className, 'WalletERC20Balance');

  var _useAccount = useAccount(),
      accountData = _useAccount.data;

  var _useERC20ContractRead = useERC20ContractRead$1(token, 'balanceOf', [accountData == null ? void 0 : accountData.address]),
      data = _useERC20ContractRead.data,
      isError = _useERC20ContractRead.isError,
      isLoading = _useERC20ContractRead.isLoading;

  if (isError || isLoading) return null;
  return createElement("div", {
    className: classes
  }, utils.formatEther(data || '0'));
};

var WalletERC20Mint = function WalletERC20Mint(_ref) {
  var className = _ref.className,
      token = _ref.token,
      amount = _ref.amount,
      symbol = _ref.symbol;
  var containerClassName = classNames(className, 'WalletERC20Mint');

  var _useAccount = useAccount(),
      accountData = _useAccount.data;

  var _useERC20ContractWrit = useERC20ContractRead(token, 'mint', [accountData == null ? void 0 : accountData.address, utils.parseEther(amount)]),
      write = _useERC20ContractWrit.write;

  return createElement("div", {
    className: containerClassName
  }, createElement("button", {
    onClick: function onClick() {
      return write();
    },
    className: "btn btn-sm btn-blue"
  }, "Mint ", amount, " ", symbol && createElement("span", {
    className: ""
  }, symbol), " Tokens"));
};

export { ERC20Approve, ERC20Balance, ERC20Mint, ERC20TotalSupply, ERC20Transfer, ERC20TransferFrom, WalletERC20Balance, WalletERC20Mint, useERC20ContractRead$1 as useERC20ContractRead };
//# sourceMappingURL=erc20-wagmi.esm.js.map
