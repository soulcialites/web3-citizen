import CitizenAlpha from "@web3-citizen/core-sol/deployments/localhost/CitizenAlpha.json";
import Link from "next/link";

import { CitizenCardList } from "@/components/Citizen/CitizenCardList";
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
        <div className="container mx-auto flex max-w-screen-lg items-center justify-between">
          <div className="">
            <h1 className="text-3xl font-bold leading-4 text-blue-700 dark:text-blue-300">
              Expand the Web3 of Trust
            </h1>
            <p className="">
              Become a <span className="font-semibold">Web3 Citizen</span>.
              Start localized trust networks.
            </p>
          </div>
          <Link href="/citizenship">
            <button className="btn btn-blue btn-ssm">
              Apply for Citizenship
            </button>
          </Link>
        </div>
      </div>
      <section>
        <div className="container mx-auto grid max-w-screen-lg py-10">
          <h1 className="mt-3 text-xl font-semibold">Current Citizens</h1>
          <CitizenCardList
            contractAddress={CitizenAlpha.address}
            className="my-4 grid grid-cols-12 gap-x-4 gap-y-10"
            classNameCard="card col-span-4"
            classNameCardImage="border-2 border-white border-opacity-30 rounded-md shadow-lg overflow-hidden h-48 w-full"
          />
        </div>
      </section>
    </Main>
  );
};

export default Index;
