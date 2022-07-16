import * as React from "react";
import Notary from "@web3-citizen/core-sol/deployments/localhost/Notary.json";
import {
  NotaryRoleAdminRole,
  NotaryRoleStatus,
} from "@web3-citizen/core-wagmi";
import classNames from "classnames";

interface NotaryRoleDetailsProps {
  className?: string;
  role: string;
  label: string;
}

export const NotaryRoleDetails = ({
  className,
  role,
  label,
}: NotaryRoleDetailsProps) => {
  const classes = classNames(className, "NotaryRoleDetails");
  return (
    <div className={classes}>
      <h3 className="text-xl font-normal">{label}</h3>
      <div className="flex">
        <ul className="listlist-disc pl-8">
          <li>
            <NotaryRoleStatus
              label="Status:"
              labelActive
              contractAddress={Notary.address}
              role={role}
            />
          </li>
          <li>
            <NotaryRoleAdminRole
              labelActive
              contractAddress={Notary.address}
              role={role}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

NotaryRoleDetails.defaultProps = {
  role: "ADMIN",
  label: "Admin",
};

export default NotaryRoleDetails;
