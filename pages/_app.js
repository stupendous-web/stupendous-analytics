import uikit from "uikit";
import "../styles/uikit/uikit.css";
import { Provider } from "../lib/context";
import { SessionProvider } from "next-auth/react";
import "remixicon/fonts/remixicon.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  console.log(
    "%c ███  █████ █   █ ████  ████ █   █ ███   ███  █   █  ███  █     █ ████ ████\n" +
      "█       █   █   █ █   █ █    ██  █ █  █ █   █ █   █ █     █     █ █    █   █\n" +
      " ███    █   █   █ ████  ███  █ █ █ █  █ █   █ █   █  ███  █  █  █ ███  ████\n" +
      "    █   █   █   █ █     █    █  ██ █  █ █   █ █   █     █  █ █ █  █    █   █\n" +
      "████    █    ███  █     ████ █   █ ███   ███   ███  ████    █ █   ████ ████ .COM\n",
    "color: #d02670"
  );

  return (
    <SessionProvider session={session}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
