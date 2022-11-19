import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import Navigation from "../components/Navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState();

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/register", {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      })
      .then(() => {
        router.replace("/app/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data);
      });
  };

  return (
    <>
      <Navigation />
      <div
        className={"uk-section"}
        data-uk-height-viewport={"offset-top: true; offset-bottom: true"}
      >
        <div className={"uk-container uk-container-xsmall"}>
          <form onSubmit={(event) => handleSubmit(event)}>
            <h1>Get Started!</h1>
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
                required
              />
            </div>
            <div className={"uk-margin"}>
              <label className={"uk-form-label"}>Password Confirmation</label>
              <input
                type={"password"}
                value={passwordConfirmation}
                className={"uk-input"}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                required
              />
            </div>
            {error && (
              <div className={"uk-margin"}>
                <div className={"uk-alert-danger"} data-uk-alert={""}>
                  <p>{error}</p>
                </div>
              </div>
            )}
            <input
              type={"submit"}
              value={"Register"}
              className={"uk-button uk-button-primary"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
