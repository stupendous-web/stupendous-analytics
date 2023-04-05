import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Navigation from "../components/Navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
      .then((response) => {
        if (!response?.error) {
          router.push("/app/dashboard");
        } else {
          setError(
            response?.status === 401
              ? "Hmm. Your email and/or password may be wrong."
              : "Hmm. Something went wrong."
          );
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Head>
        <title>
          Login | NextJS Website Analytics Dashboard | Stupendous Web
        </title>
        <meta property={"og:url"} content={"https://stupendousanalytics.com"} />
        <meta
          property={"og:title"}
          content={
            "Login | NextJS Website Analytics Dashboard | Stupendous Web"
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                href={"/register"}
                title={
                  "Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web"
                }
              >
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
