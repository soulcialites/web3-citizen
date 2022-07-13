import React from "react";
import CitizenAlpha from "@web3-citizen/core-sol/deployments/localhost/CitizenAlpha.json";
import { FormCitizenEnsUpdate } from "@web3-citizen/core-wagmi";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";

const namehash = require("@ensdomains/eth-ens-namehash");

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

export const ModalEditCitizenProfile = ({
  children,
  className,
  ensNode,
  ensTextRecords,
}: any) => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen style={customStyles} onRequestClose={hideModal}>
      <div className="block w-full max-w-screen-xl p-8" style={{ width: 480 }}>
        <h3 className="text-2xl font-normal">Web3 Citizen Profile</h3>
        <p className="">
          Recommended: Use the Ethereum Name System app to set text fields.
        </p>
        <hr className="my-2 bg-gray-700" />
        <FormCitizenEnsUpdate
          contractAddress={"0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41"}
          ensNode={namehash.hash(ensNode)}
          defaultValues={ensTextRecords}
        />
      </div>
    </ReactModal>
  ));

  return (
    <span className={className} onClick={showModal}>
      {children}
    </span>
  );
};

export default ModalEditCitizenProfile;
