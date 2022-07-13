import CitizenAlpha from "@web3-citizen/core-sol/deployments/localhost/CitizenAlpha.json";
import { FormCitizenRevoke } from "@web3-citizen/core-wagmi";
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

interface ModalCitizenshipRevokeProps {
  className?: string;
  classNameButton?: string;
  label?: string;
}

export const ModalCitizenshipRevoke = ({
  className,
  classNameButton,
  label,
}: ModalCitizenshipRevokeProps) => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen style={customStyles} onRequestClose={hideModal}>
      <div className={className}>
        <div className="block w-full max-w-screen-xl" style={{ width: 480 }}>
          <h3 className="text-2xl font-normal">Revoke Citizenship</h3>
          <hr className="my-2 bg-gray-700" />
          <FormCitizenRevoke contractAddress={CitizenAlpha.address} />
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

ModalCitizenshipRevoke.defaultProps = {
  label: "Revoke Citizenship",
};

export default ModalCitizenshipRevoke;
