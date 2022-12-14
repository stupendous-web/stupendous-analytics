import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Navigation from "../components/Navigation";

import screenshot from "../images/screenshot.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          NextJS Website Analytics Dashboard | Stupendous Web | If you want to
          build community, build a stupendous web app
        </title>
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
                project. Need help? Read the documentation or visit{" "}
                <a
                  href={"https://stupendousweb.com"}
                  title={"Web App Development Services | Stupendous Web"}
                >
                  Stupendous Web
                </a>{" "}
                for more.
              </p>
              <p>
                <Link href={"/api/auth/login"} legacyBehavior>
                  <a
                    className={"uk-button uk-button-primary uk-margin-right"}
                    title={
                      "Login | NextJS Website Analytics Dashboard | Stupendous Web"
                    }
                  >
                    Login
                  </a>
                </Link>
                <Link
                  href={
                    "https://github.com/stupendous-web/stupendous-analytics-next"
                  }
                  legacyBehavior
                >
                  <a className={"uk-button uk-button-default"}>Docs</a>
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
                className={"uk-padding uk-padding-remove-horizontal"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
