import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

const About = () => (
  <Main
    meta={
      <Meta
        title={`${AppConfig.title} | ${AppConfig.description}`}
        description={AppConfig.description}
      />
    }
  >
    <section className="py-12">
      <div className="container mx-auto max-w-screen-sm">
        <h3 className="text-6xl font-bold">Web3 Citizenship</h3>
      </div>
    </section>
    <section className="dark: mx-auto bg-gradient-to-br from-neutral-100 via-neutral-100 to-neutral-200 py-12 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white">
      <div className="container mx-auto max-w-screen-sm py-14">
        <div className="col-span-8">
          <h1 className="m-0 mb-4 text-3xl font-bold">How It Works</h1>
          <p className="mb-4 text-xl font-semibold">
            The Web3 Citizenship is Soulbound ✨
          </p>
          <p className="text-normal">
            A Web3 Citizenship is combination of on-chain permissions and
            off-chain data.
          </p>
          <p>
            The Citizenship unlocks{" "}
            <span className="font-bold">on-chain permissions</span> like future
            experiments with sybil resistant voting and access to Town Hall
            treasury funds.
          </p>
          <p className="italic">And...</p>
          <p>
            The Citizenship can be linked to{" "}
            <span className="font-bold">off-chain data</span> (avatars,
            decentralized identifiers, twitter handles, and more) using the{" "}
            <a href="https://ens.domains/">Ethereum Name System</a>.
          </p>
          <hr className="my-6" />
          <p>
            Together <span className="font-bold">on-chain permissions</span>s
            and <span className="font-bold">off-chain data</span> can create a
            Web3 of Trust: unlocking new opportunities for coordination and
            experimentation.
          </p>
          <hr className="my-6" />
          <p>
            <span className="font-bold">
              To acquire the Citizenship you must be invited by an existing
              Citizen.
            </span>{" "}
          </p>
          <p>
            Tweet at{" "}
            <a href="https://twitter.com/KamesGeraghty">@KamesGeraghty</a> to
            request a Citizenship.
          </p>
        </div>
      </div>
    </section>
  </Main>
);

export default About;
