import Notary from "@web3-citizen/core-sol/deployments/localhost/Notary.json";
import {
  NotaryFormDisableRole,
  NotaryFormEnableRole,
} from "@web3-citizen/core-wagmi";

import NotaryRoleDetails from "@/components/Notary/NotaryRoleDetails";
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
      <section className="dark: mx-auto bg-gradient-to-b from-neutral-100 via-neutral-100 to-neutral-200 py-12 px-10 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-800 dark:text-white lg:px-20">
        <div className="container mx-auto grid max-w-screen-xl grid-cols-12">
          <div className="col-span-6">
            <h1 className="m-0 mb-0 text-3xl font-bold">Town Hall</h1>
          </div>
          <div className="col-span-6 flex items-center justify-end">
            <h3 className="text-lg font-normal">Manage Roles &amp; Access</h3>
          </div>
        </div>
      </section>
      <section className="py-14 px-10 lg:px-20">
        <div className="container mx-auto grid max-w-screen-xl grid-cols-12 lg:gap-x-14">
          <div className="card col-span-12 lg:col-span-4">
            <h3 className="text-2xl font-semibold">Roles</h3>
            <hr className="my-2" />
            <NotaryRoleDetails role="NOTARY" label="Notary" />
            <NotaryRoleDetails role="FOUNDER" label="Founder" />
            <NotaryRoleDetails role="TREASURY" label="Treasury" />
            <NotaryRoleDetails role="LABS" label="Labs" />
            <NotaryRoleDetails role="SENATE" label="Senate" />
            <NotaryRoleDetails role="EXECUTIVE" label="Executive" />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Enable Role</h3>
                <span className="">Activate a Role globally.</span>
              </div>
              <hr className="my-3" />
              <NotaryFormEnableRole
                className="mt-5"
                contractAddress={Notary.address}
              />
            </div>
            <div className="card mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Disable Role</h3>
                <span className="">Disable a Role globally.</span>
              </div>
              <hr className="my-3" />
              <NotaryFormDisableRole
                className="mt-5"
                contractAddress={Notary.address}
              />
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Index;
