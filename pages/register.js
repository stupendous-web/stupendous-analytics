import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";

import Navigation from "../components/Navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/users", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: "/app/dashboard",
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error?.response?.data?.title || "Hmm. Something went wrong.");
      });
  };

  return (
    <>
      <Head>
        <title>
          Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web
        </title>
        <meta property={"og:url"} content={"https://stupendousanalytics.com"} />
        <meta
          property={"og:title"}
          content={
            "Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web"
          }
        />
        <meta property={"og:type"} content={"website"} />
      </Head>
      <Navigation />
      <div
        className={"uk-section uk-section-default uk-flex uk-flex-middle"}
        data-uk-height-viewport={"offset-top: true"}
      >
        <div
          className={"uk-container"}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <div class={"uk-card uk-card-primary uk-card-body"}>
            <Link
              href={"/"}
              title={
                "NextJS Website Analytics Dashboard | Stupendous Web | If you want to build community, build stupendous software"
              }
            >
              Stupendous Analytics
            </Link>
            <h1>Join for FREE!</h1>
            <form onSubmit={handleSubmit}>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Name</label>
                <input
                  type={"text"}
                  value={name}
                  className={"uk-input"}
                  onChange={(event) => setName(event.currentTarget.value)}
                  required
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Email</label>
                <input
                  type={"email"}
                  value={email}
                  className={"uk-input"}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  required
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Password</label>
                <input
                  type={"password"}
                  value={password}
                  className={"uk-input"}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  minLength={8}
                  required
                />
              </div>
              {error && (
                <div className={"uk-alert-danger"} data-uk-alert={""}>
                  <p>
                    {error} Please try again or email{" "}
                    <Link
                      href={"mailto:topher@stupendousweb.com"}
                      className={"uk-link-reset"}
                    >
                      topher@stupendousweb.com
                    </Link>{" "}
                    for help.
                  </p>
                </div>
              )}
              <input
                type={"submit"}
                value={"Let's Go!"}
                className={"uk-button uk-button-primary uk-margin-right"}
              />
              <Link
                href={"/login"}
                title={
                  "Login | NextJS Website Analytics Dashboard | Stupendous Web"
                }
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
