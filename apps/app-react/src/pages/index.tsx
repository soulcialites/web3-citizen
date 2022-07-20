import CitizenAlpha from "@web3-citizen/core-sol/deployments/mainnet/CitizenAlpha.json";
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
            <h1 className="text-3xl font-light leading-4">
              Expand the <span className="font-semibold">Web3 of Trust</span>
            </h1>
            <p className="mt-2 text-sm dark:text-neutral-300">
              <span className="font-semibold">Become a Web3 Citizen</span>.
              Start localized trust networks.
            </p>
          </div>
          <Link href="/citizenship">
            {/* <button className="btn btn-default">Apply for Citizenship</button> */}
            <button
              type="button"
              className="mr-2 mb-2 inline-flex items-center rounded-lg bg-gray-50 px-5 py-2.5 text-center text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-200 dark:focus:ring-gray-500"
            >
              <svg
                className="mr-2 -ml-1 h-4 w-4 text-[#626890]"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="ethereum"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                ></path>
              </svg>
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
