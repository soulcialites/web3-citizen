import Notary from "@web3-citizen/core-sol/deployments/mainnet/Notary.json";
import { FormCitizenIssue } from "@web3-citizen/core-wagmi";
import React from "react";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface ModalCitizenshipIssueProps {
  className?: string;
  classNameButton?: string;
  label?: string;
}

export const ModalCitizenshipIssue = ({
  className,
  classNameButton,
  label,
}: ModalCitizenshipIssueProps) => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen style={customStyles} onRequestClose={hideModal}>
      <div className={className}>
        <div className="block w-full max-w-screen-xl" style={{ width: 480 }}>
          <h3 className="text-2xl font-normal">Issue Citizenship</h3>
          <hr className="my-2 bg-gray-700" />
          <FormCitizenIssue contractAddress={CitizenNotary.address} />
        </div>
      </div>
    </ReactModal>
  ));

  return (
    <button className={classNameButton} onClick={showModal}>
      {label}
    </button>
  );
};

ModalCitizenshipIssue.defaultProps = {
  label: "Issue Citizenship",
};

export default ModalCitizenshipIssue;
