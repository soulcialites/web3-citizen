import Nation from "@web3-citizen/core-sol/deployments/mainnet/Nation.json";
import {
  NationRoleAdminRole,
  NationRoleStatus,
} from "@web3-citizen/core-wagmi";
import classNames from "classnames";
import * as React from "react";

interface NationRoleDetailsProps {
  className?: string;
  role: string;
  label: string;
}

export const NationRoleDetails = ({
  className,
  role,
  label,
}: NationRoleDetailsProps) => {
  const classes = classNames(className, "NationRoleDetails");
  return (
    <div className={classes}>
      <h3 className="text-xl font-normal">{label}</h3>
      <div className="flex">
        <ul className="listlist-disc pl-8">
          <li>
            <NationRoleStatus
              label="Status:"
              labelActive
              contractAddress={Nation.address}
              role={role}
            />
          </li>
          <li>
            <NationRoleAdminRole
              labelActive
              contractAddress={Nation.address}
              role={role}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

NationRoleDetails.defaultProps = {
  role: "ADMIN",
  label: "Admin",
};

export default NationRoleDetails;
