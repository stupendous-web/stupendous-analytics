import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

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

      <div className={"uk-section"}>
        <div className={"uk-container uk-container-xsmall"}>
          <h1>NextJS Website Analytics Dashboard</h1>
          <p>
            Finally an easy-to-install web analytics tracker and dashboard for
            NextJS apps. Getting started with Stupendous Web Analytics is easy.
            Install and add these simple lines of code to your project. Need
            help? Read the documentation or visit{" "}
            <a
              href={"https://stupendousweb.com"}
              title={"Web App Development Services | Stupendous Web"}
            >
              Stupendous Web
            </a>{" "}
            for more.
          </p>
        </div>
      </div>
      <div className={"uk-section"}>
        <div className={"uk-container uk-container-small"}>
          <Image src={screenshot} alt={"React JS Web Analytics + Dashboard"} />
        </div>
      </div>
      <div className={"uk-section"}>
        <div className={"uk-container uk-container-xsmall"}>
          <p>
            <Link href={"/api/auth/login"} legacyBehavior>
              <a
                className={"uk-button uk-button-primary uk-button-large"}
                title={
                  "Login | NextJS Website Analytics Dashboard | Stupendous Web"
                }
              >
                Login
              </a>
            </Link>
          </p>
          <p>
            Learn more at{" "}
            <Link href={"https://stupendousweb.com"} legacyBehavior>
              <a
                title={
                  "Web App Development Services | Stupendous Web | If you want to build community, build a stupendous web app"
                }
              >
                Stupendous Web
              </a>
            </Link>
          </p>
        </div>
      </div>
      <div className={"uk-section"}>
        <div className={"uk-container uk-container-xsmall"}>
          <h2>Easy Installation</h2>
          <pre
            className={"uk-padding-small uk-margin-small-top uk-section-muted"}
          >
            <code>npm install stupendous-analytics</code>
          </pre>
          <p className={"uk-text-muted uk-text-small uk-margin-remove-bottom"}>
            ./index.js
          </p>
          <pre
            className={"uk-padding-small uk-margin-small-top uk-section-muted"}
          >
            <code>
              &#60;StupendousAnalytics site={"{"}ID{"}"} &frasl;&#62;
            </code>
          </pre>
          <p>
            Getting started with Stupendous Analytics is easy. Install and add
            these simple lines of code to your project. Need help? Read the{" "}
            <a href={"https://www.npmjs.com/package/stupendous-analytics"}>
              documentation
            </a>{" "}
            or visit{" "}
            <a
              href={"https://stupendousweb.com"}
              title={"Web App Development Services | Stupendous Web"}
            >
              Stupendous Web
            </a>{" "}
            for more.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
