import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";

import login from "../images/login.svg";

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
          callbackUrl: "/app",
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
          Register for FREE! | NextJS Website Analytics Dashboard | Stupendous
          Web
        </title>
      </Head>
      <div className={"uk-grid-collapse uk-flex-middle"} data-uk-grid={""}>
        <div
          className={
            "uk-background-primary uk-width-2-3@s uk-visible@s uk-flex uk-flex-center uk-flex-middle"
          }
          data-uk-height-viewport={""}
        >
          <div className={"uk-section"}>
            <div className={"uk-container"}>
              <Image src={login} alt={"Login"} />
            </div>
          </div>
        </div>
        <div className={"uk-width-1-3@s"}>
          <div className={"uk-section"}>
            <div className={"uk-container"}>
              <h1>Join for FREE!</h1>
              <form onSubmit={handleSubmit}>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Name</label>
                  <input
                    type={"text"}
                    value={name}
                    className={"uk-input"}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Email</label>
                  <input
                    type={"email"}
                    value={email}
                    className={"uk-input"}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Password</label>
                  <input
                    type={"password"}
                    value={password}
                    className={"uk-input"}
                    onChange={(event) => setPassword(event.target.value)}
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
                        legacyBehavior
                      >
                        <a>topher@stupendousweb.com</a>
                      </Link>{" "}
                      for help.
                    </p>
                  </div>
                )}
                <input
                  type={"submit"}
                  value={"Let's Go!"}
                  className={"uk-button uk-button-primary"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
