import * as React from "react";
import { namehash, usePublicResolverRead } from "@turbo-eth/ens-wagmi";
import { useNotaryServiceDelegatableWrite } from "@web3-citizen/core-wagmi";
import classNames from "classnames";
import { useAccount } from "wagmi";

interface NotaryServiceDelegatableClaimFromInviteListProps {
  className?: string;
  label: string;
  onUpdate?: Function;
  defaults?: any;
  contractAddress: string;
}
export const NotaryServiceDelegatableClaimFromInviteList = ({
  className,
  label,
  onUpdate,
  contractAddress,
}: NotaryServiceDelegatableClaimFromInviteListProps) => {
  const classes_ = classNames(
    className,
    "NotaryServiceDelegatableClaimFromInviteList"
  );

  const account = useAccount();
  const ensNode = namehash.hash("web3oftrust.eth");
  const { data } = usePublicResolverRead(
    "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
    "text",
    [ensNode, "delegations"]
  );

  const [isClaimable, setIsClaimable] = React.useState<boolean>();
  const [invitation, setInvitation] = React.useState<{
    intention: string;
    signature: string;
  }>();
  React.useEffect(() => {
    (async () => {
      if (true) {
        const res = await fetch(
          // data ||
          "https://gateway.pinata.cloud/ipfs/QmXVSMicj3YYgyigcgygrKc1gbR1bY2iiHQ3p2AYXb59bm"
        );
        const results = await res.json();
        const invitation = results[account?.data?.address?.toLowerCase() || ""];
        if (invitation) {
          setInvitation(invitation);
          setIsClaimable(true);
        }
      }
    })();
  }, [data]);

  const { write } = useNotaryServiceDelegatableWrite(
    contractAddress,
    "invoke",
    [
      [
        {
          invocations: invitation?.intention,
          signature: invitation?.signature,
        },
      ],
    ]
  );

  const onSubmit = (_data: any) => {
    write();
    if (onUpdate) onUpdate(_data);
  };

  if (!isClaimable)
    return <span className="">Unable to Claim Citizenship</span>;

  return (
    <div className={classes_}>
      <button
        onClick={onSubmit}
        className="btn btn-default my-3 w-full"
        type="submit"
      >
        {label}
      </button>
    </div>
  );
};

NotaryServiceDelegatableClaimFromInviteList.defaultProps = {
  label: "Claim Citizenship",
};

export default NotaryServiceDelegatableClaimFromInviteList;
