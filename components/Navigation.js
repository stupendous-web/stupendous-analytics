import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

import Filters from "./Filters";

export default function Navigation() {
  const router = useRouter();

  const { user } = useUser();

  return (
    <nav
      className={"uk-navbar-container uk-light uk-box-shadow-medium"}
      data-uk-navbar={""}
    >
      {router.pathname === "/app/dashboard" ? (
        <div className={"uk-navbar-left"}>
          <div className={"uk-navbar-item"}>
            <div>
              <div>Hello, {user?.nickname}!</div>
              <div className={"uk-text-small uk-text-muted"}>
                Site: {user?.email}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link href={"/"} legacyBehavior>
          <a
            title={
              "NextJS Website Analytics Dashboard | Stupendous Web | If you want to build community, build a stupendous web app"
            }
            className={"uk-navbar-item uk-logo"}
          >
            Stupendous Analytics
          </a>
        </Link>
      )}
      <div className={"uk-navbar-right"}>
        {!!user ? (
          <>
            {router.pathname === "/app/dashboard" && <Filters />}
            <div className={"uk-navbar-item"}>
              <Link href={"/app/dashboard"} legacyBehavior>
                <a className={"uk-button uk-button-primary uk-margin-right"}>
                  Dashboard
                </a>
              </Link>
              <Link href={"/api/auth/logout"} legacyBehavior>
                <a className={"uk-button uk-button-primary"}>Logout</a>
              </Link>
            </div>
          </>
        ) : (
          <div className={"uk-navbar-item"}>
            <Link href={"/api/auth/login"} legacyBehavior>
              <a
                title={
                  "Login | NextJS Website Analytics Dashboard | Stupendous Web"
                }
                className={"uk-button uk-button-primary"}
              >
                Login
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
