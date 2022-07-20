import { Address } from "@turbo-eth/core-wagmi";
import Notary from "@web3-citizen/core-sol/deployments/mainnet/Notary.json";
import NotaryServiceDelegatable from "@web3-citizen/core-sol/deployments/mainnet/NotaryServiceDelegatable.json";
import {
  FormCitizenIssue,
  FormCitizenRevoke,
  NotaryServiceDelegatableFormClaimDelegate,
} from "@web3-citizen/core-wagmi";

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
              Issue Citizenship and Grant/Revoke Notary permissions
            </h3>
          </div>
        </div>
      </section>
      <section className="px-10 py-12 lg:px-20">
        <div className="container mx-auto grid max-w-screen-md">
          <div className="grid grid-cols-12 gap-x-4 gap-y-6">
            <div className="col-span-12 lg:col-span-6">
              <div className="card">
                <h3 className="text-xl font-semibold">Issue Citizenship</h3>
                <hr className="my-3" />
                <FormCitizenIssue
                  className=""
                  contractAddress={Notary.address}
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="card">
                <h3 className="text-xl font-semibold">Revoke Citizenship</h3>
                <hr className="my-3" />
                <FormCitizenRevoke
                  className=""
                  contractAddress={Notary.address}
                />
              </div>
            </div>
            <div className="card col-span-12">
              <div className="mb-8 flex w-full flex-col items-center justify-between md:flex-row">
                <span className="font-semibold">DelegatableNotary:</span>
                <Address
                  className="text-xs"
                  address={NotaryServiceDelegatable.address}
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  Create Citizenship Invite
                </h3>
                <span className="">
                  <a
                    className="hover:text-slate-700"
                    target={"_blank"}
                    href="https://github.com/danfinlay/delegatable-eth"
                    rel="noreferrer"
                  >
                    Delegatable.eth | Learn More
                  </a>
                </span>
              </div>
              <hr className="my-3" />
              <NotaryServiceDelegatableFormClaimDelegate
                className="mt-5"
                contractAddress={NotaryServiceDelegatable.address}
              />
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Index;
