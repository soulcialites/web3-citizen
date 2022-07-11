import CitizenAlpha from "@web3-citizen/core-sol/deployments/mainnet/CitizenAlpha.json";
import { CitizenCardList, NFTCard } from "@web3-citizen/core-wagmi";

import ModalCitizenshipIssue from "@/components/ModalCitizenshipIssue";
import ModalCitizenshipRevoke from "@/components/ModalCitizenshipRevoke";
import { ModalEditCitizenProfile } from "@/components/ModalEditCitizenProfile";
import ModalFounderAdd from "@/components/ModalFounderAdd";
import ModalFounderRemove from "@/components/ModalFounderRemove";
import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      <div className="dark: mx-auto bg-gradient-to-br from-neutral-100 via-neutral-100 to-neutral-200 py-12 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white">
        <div className="container mx-auto grid max-w-screen-lg grid-cols-12">
          <div className="col-span-6">
            <h1 className="m-0 mb-0 text-3xl font-bold">Town Hall</h1>
          </div>
          <div className="col-span-6 flex items-center justify-center"></div>
        </div>
      </div>
      <section>
        <div className="container mx-auto max-w-screen-lg py-5">
          <h3 className="text-3xl font-normal">Citizen</h3>
          <hr className="my-3" />
          <p className="">
            Citizens can issue a new Citizenship. You are trusted to build the
            Web3 of Trust.
          </p>
          <ModalCitizenshipIssue classNameButton="btn btn-blue" />
        </div>
        <div className="container mx-auto max-w-screen-lg py-5">
          <h3 className="text-3xl font-normal">Founders</h3>
          <hr className="my-3" />
          <p className="">
            Founders can revoke a Citizenship. With great power comes great
            responsibility.
          </p>
          <ModalCitizenshipRevoke classNameButton="btn btn-blue" />
        </div>
        <div className="container mx-auto max-w-screen-lg py-5">
          <h3 className="text-3xl font-normal">Admin</h3>
          <hr className="my-3" />
          <p className="">God Mode</p>
          <ModalFounderAdd classNameButton="btn btn-blue" />
          <ModalFounderRemove classNameButton="btn btn-blue ml-8" />
        </div>
      </section>
    </Main>
  );
};

export default Index;
