import Notary from "@web3-citizen/core-sol/deployments/localhost/Notary.json";
import {
  FormCitizenIssue,
  FormCitizenRevoke,
  NotaryFormCitizenRevoke,
  NotaryFormHasRole,
  NotaryFormIsFounder,
  NotaryFormRoleGrant,
  NotaryFormRoleRevoke,
  NotaryRoleAdminRole,
  NotaryRoleStatus,
} from "@web3-citizen/core-wagmi";

import ModalCitizenshipIssue from "@/components/ModalCitizenshipIssue";
import ModalCitizenshipRevoke from "@/components/ModalCitizenshipRevoke";
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
      <section className="mx-auto bg-gradient-to-b from-neutral-100 via-neutral-100 to-neutral-200 py-12 px-10 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-800 dark:text-white lg:px-20">
        <div className="container mx-auto grid max-w-screen-md grid-cols-12">
          <div className="col-span-6">
            <h1 className="m-0 mb-0 text-3xl font-bold">Notary</h1>
          </div>
          <div className="col-span-6 flex items-center justify-end">
            <h3 className=" text-sm font-normal">
              Issue Citizenship and control Roles
            </h3>
          </div>
        </div>
      </section>
      <section className="py-14 px-10 lg:px-20">
        <div className="container mx-auto grid max-w-screen-md">
          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-6">
              <div className="card">
                <h3 className="text-xl font-semibold">Issue Citizenship</h3>
                <hr className="my-3" />
                <FormCitizenIssue
                  className=""
                  contractAddress={Notary.address}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="card">
                <h3 className="text-xl font-semibold">Revoke Citizenship</h3>
                <hr className="my-3" />
                <FormCitizenRevoke
                  className=""
                  contractAddress={Notary.address}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="card mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Is Founder</h3>
                <span className="">Check Founder status of Citizen.</span>
              </div>
              <hr className="my-3" />
              <NotaryFormIsFounder
                className="mt-5"
                contractAddress={Notary.address}
              />
            </div>
            <div className="card mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Has Role</h3>
                <span className="">Check a Citizen role status.</span>
              </div>
              <hr className="my-3" />
              <NotaryFormHasRole
                className="mt-5"
                contractAddress={Notary.address}
              />
            </div>
          </div>
          <div className="card mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Grant Role</h3>
              <span className="">Grant an active Role to a Citizen</span>
            </div>
            <hr className="my-3" />
            <NotaryFormRoleGrant
              className=""
              contractAddress={Notary.address}
            />
          </div>
          <div className="card mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Revoke Role</h3>
              <span className="">Revoke Role from a Citizen</span>
            </div>
            <hr className="my-3" />
            <NotaryFormRoleRevoke
              className=""
              contractAddress={Notary.address}
            />
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Index;
