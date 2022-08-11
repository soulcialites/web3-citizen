import { useEditProfile } from "@web3-citizen/self.id-extensions";

import IdentityConnect from "@/components/Identity/IdentityConnect";
import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

const About = () => {
  const [isUpdating, editProfile] = useEditProfile();
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      <section className="dark: mx-auto bg-gradient-to-br from-neutral-100 via-neutral-100 to-neutral-200 py-12 text-neutral-500 shadow-sm dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:text-white">
        <div className="container mx-auto max-w-screen-sm py-14">
          <IdentityConnect />
          <button
            onClick={() =>
              editProfile({
                name: "Kames Geraghty",
                emoji: "🤓",
                description:
                  "I am a software developer and I am passionate about the web.",
                homeLocation: "New York, NY",
              })
            }
            className="btn"
          >
            Update Profile
          </button>
        </div>
      </section>
    </Main>
  );
};

export default About;
