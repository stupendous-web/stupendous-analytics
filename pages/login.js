import { useState } from "react";
import { useGlobal } from "../lib/context";
import axios from "axios";

import Navigation from "../components/Navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const { setUser } = useGlobal();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Those credentials don't match");
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
            <h1>Login</h1>
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
            {error && (
              <div className={"uk-alert-danger"} data-uk-alert={""}>
                <p>{error}</p>
              </div>
            )}
            <input
              type={"submit"}
              value={"Login "}
              className={"uk-button uk-button-primary"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
