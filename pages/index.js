import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Navigation from "../components/Navigation";

import screenshot from "../images/screenshot.png";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>
          NextJS Website Analytics Dashboard | Stupendous Web | If you want to
          build community, build stupendous software
        </title>
        <meta property={"og:url"} content={"https://stupendousanalytics.com"} />
        <meta
          property={"og:title"}
          content={
            "NextJS Website Analytics Dashboard | Stupendous Web | If you want to build community, build stupendous software"
          }
        />
        <meta property={"og:type"} content={"website"} />
      </Head>
      <Navigation />
      <div style={{ overflowY: "auto" }}>
        <div className={"uk-container uk-container-large"}>
          <div
            className={"uk-child-width-1-2@s uk-flex-middle"}
            data-uk-grid={""}
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <div>
              <p className={"uk-text-bold"}>
                NextJS Website Analytics Dashboard
              </p>
              <p>
                Finally an easy-to-install web analytics tracker and dashboard
                for NextJS apps. Getting started with Stupendous Web Analytics
                is easy. Install and add two simple lines of code to your
                project. Need help? Read the{" "}
                <Link
                  href={
                    "https://github.com/stupendous-web/stupendous-analytics-next"
                  }
                >
                  documentation
                </Link>{" "}
                or visit{" "}
                <a
                  href={"https://stupendousweb.com"}
                  title={"Web App Development Services | Stupendous Web"}
                >
                  Stupendous Web
                </a>{" "}
                for more.
              </p>
              <p>
                {session?.user ? (
                  <>
                    <Link
                      href={"/app/dashboard"}
                      className={"uk-button uk-button-primary uk-margin-right"}
                      title={
                        "Dashboard | NextJS Website Analytics Dashboard | Stupendous Web"
                      }
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={"/register"}
                      className={"uk-button uk-button-primary uk-margin-right"}
                      title={
                        "Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web"
                      }
                    >
                      Join for FREE!
                    </Link>
                    <Link
                      href={"/login"}
                      className={"uk-button uk-button-default uk-margin-right"}
                      title={
                        "Login | NextJS Website Analytics Dashboard | Stupendous Web"
                      }
                    >
                      Login
                    </Link>
                  </>
                )}
                <Link
                  href={
                    "https://github.com/stupendous-web/stupendous-analytics-next"
                  }
                  className={"uk-button uk-button-default"}
                >
                  Docs
                </Link>
              </p>
              <p className={"uk-text-small"}>
                &copy; Copyright 2022{" "}
                <a
                  href={"https://stupendousweb.com"}
                  title={"Web App Development Services | Stupendous Web"}
                >
                  Stupendous Web
                </a>
                .
              </p>
            </div>
            <div>
              <Image
                src={screenshot}
                alt={"NextJS Web Analytics Dashboard"}
                className={"uk-padding uk-padding-remove uk-box-shadow-small"}
                style={{ borderRadius: ".5rem" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
