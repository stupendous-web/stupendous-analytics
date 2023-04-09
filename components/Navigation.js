import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import gravatar from "gravatar";

import Filters from "./Filters";

export default function Navigation() {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <nav className={"uk-navbar-container"} data-uk-navbar={""}>
      {router.pathname === "/app/dashboard" ? (
        <div className={"uk-navbar-left"}>
          <div className={"uk-navbar-item"}>
            <Link href={"https://en.gravatar.com/connect"} target={"_blank"}>
              <img
                src={gravatar.url(session?.user?.email)}
                className={"uk-border-circle"}
                style={{ width: "2rem" }}
              />
            </Link>
          </div>
          <div className={"uk-navbar-item"}>
            <div>
              <div>Hello, {session?.user?.name}!</div>
              <div className={"uk-text-small uk-text-muted"}>
                Site: {session?.user?.sites?.[0]?._id}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link
          href={"/"}
          title={
            "NextJS Website Analytics Dashboard | Stupendous Web | If you want to build community, build stupendous software"
          }
          className={"uk-navbar-item uk-logo"}
        >
          Stupendous Analytics
        </Link>
      )}
      <div className={"uk-navbar-right"}>
        {!!session?.user ? (
          <>
            {router.pathname === "/app/dashboard" && <Filters />}
            <div className={"uk-navbar-item"}>
              {router.pathname !== "/app/dashboard" && (
                <Link
                  href={"/app/dashboard"}
                  className={"uk-button uk-button-primary uk-margin-right"}
                >
                  Dashboard
                </Link>
              )}
              <div
                className={"uk-button uk-button-primary"}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </div>
            </div>
          </>
        ) : (
          <div className={"uk-navbar-item"}>
            <Link
              href={"/register"}
              title={
                "Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web"
              }
              className={"uk-button uk-button-primary uk-margin-right"}
            >
              Join for FREE!
            </Link>
            <Link
              href={"/login"}
              title={
                "Login | NextJS Website Analytics Dashboard | Stupendous Web"
              }
              className={"uk-button uk-button-primary"}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
