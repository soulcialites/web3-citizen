import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import type { ReactNode } from "react";

import { ColorMode } from "@/components/App/ColorMode";
import IdentityConnect from "@/components/Identity/IdentityConnect";
import { AppConfig } from "@/utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full bg-white text-gray-700 antialiased dark:text-white">
    {props.meta}

    <div className="min-h-vh mx-auto h-10 w-full dark:bg-neutral-900 dark:text-white">
      <div className="grid grid-cols-12 gap-y-4 border-b border-gray-300 px-8 py-4 dark:border-neutral-500 dark:bg-neutral-900 dark:text-white lg:flex-row lg:gap-y-0">
        <div className="col-span-12 flex items-center default:justify-center lg:col-span-3 lg:justify-start lg:justify-items-start">
          <Link href="/">
            <span className="text-1xl cursor-pointer font-bold text-gray-900 dark:text-white">
              <span className="text-3l">{AppConfig.emoji}</span>{" "}
              {AppConfig.title} | <span className="font-light">Alpha</span>
            </span>
          </Link>
        </div>
        <div className="col-span-12 flex items-center justify-center lg:col-span-6">
          <ul className="ml-10 flex flex-wrap text-sm">
            <li className="mr-6">
              <Link href="/citizenship/">
                <a className="font-semibold text-gray-700 hover:text-gray-900 dark:text-white hover:dark:text-neutral-100">
                  🆔 Citizen
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/notary/">
                <a className="font-semibold text-gray-700 hover:text-gray-900 dark:text-white hover:dark:text-neutral-100">
                  🔏 Notary
                </a>
              </Link>
            </li>

            <li className="mr-6">
              <Link href="/public-goods/">
                <a className="font-semibold text-gray-700 hover:text-gray-900 dark:text-white hover:dark:text-neutral-100">
                  🏦 PGP.alpha
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-12 flex default:justify-center lg:col-span-3 lg:justify-end">
          <ConnectButton
            chainStatus={{ largeScreen: "icon", smallScreen: "name" }}
            accountStatus={{ largeScreen: "full", smallScreen: "address" }}
            showBalance={false}
          />
          <IdentityConnect />
        </div>
      </div>

      <div className="content bg-neutral-100 dark:bg-neutral-800">
        {props.children}
      </div>

      <div className="border-t border-gray-300 bg-white py-8 text-center text-sm dark:border-neutral-500 dark:bg-neutral-900 dark:text-white">
        <div className="mb-3 flex items-center justify-center">
          <ul className="flex flex-wrap text-sm">
            <li className="mr-6">
              <Link href="/nation/">
                <a className="font-semibold text-gray-700 hover:text-gray-900 dark:text-white hover:dark:text-neutral-100">
                  🏛️ Nation
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/experiments/">
                <a className="border-none text-gray-700 hover:text-gray-900 dark:text-white hover:dark:text-neutral-100">
                  🗳️ Experiments
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/get-involved/">
                <a className="border-none text-gray-700 hover:text-gray-900 dark:text-white hover:dark:text-neutral-100">
                  🏗️ Get Involved
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="container mx-auto mb-4 flex max-w-md items-center justify-center text-center">
          <ul className="flex flex-wrap text-sm">
            <li className="mr-6">
              <Link href="/about/">
                <a className="border-none text-gray-700 hover:text-gray-900 dark:text-white hover:dark:text-neutral-100">
                  About
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <a
                target={"_blank"}
                className="flex items-center border-none text-gray-700 hover:text-gray-900 dark:text-white hover:dark:text-neutral-100"
                href="https://twitter.com/kamesgeraghty"
                rel="noreferrer"
              >
                <svg
                  className="mr-2 -ml-1 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="twitter"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                  ></path>
                </svg>

                <span className="">Twitter</span>
              </a>
            </li>
            <li className="mr-6">
              <a
                target={"_blank"}
                className="flex items-center border-none text-gray-700 hover:text-gray-900 dark:text-white hover:dark:text-neutral-100"
                href="https://github.com/soulcialites/web3-citizen"
                rel="noreferrer"
              >
                <svg
                  className="mr-2 -ml-1 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
                <span className="">GitHub</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          © Copyright {new Date().getFullYear()} Kames Geraghty
        </div>
        <ColorMode className="mt-3" />
      </div>
    </div>
  </div>
);

export { Main };
