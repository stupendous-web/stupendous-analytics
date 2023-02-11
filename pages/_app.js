import uikit from "uikit";
import "../styles/uikit/uikit.css";
import { Provider } from "../lib/context";
import { UserProvider } from "@auth0/nextjs-auth0";
import "remixicon/fonts/remixicon.css";

export default function MyApp({ Component, pageProps }) {
  console.log(
    "%c ███  █████ █   █ ████  ████ █   █ ███   ███  █   █  ███  █     █ ████ ████\n" +
      "█       █   █   █ █   █ █    ██  █ █  █ █   █ █   █ █     █     █ █    █   █\n" +
      " ███    █   █   █ ████  ███  █ █ █ █  █ █   █ █   █  ███  █  █  █ ███  ████\n" +
      "    █   █   █   █ █     █    █  ██ █  █ █   █ █   █     █  █ █ █  █    █   █\n" +
      "████    █    ███  █     ████ █   █ ███   ███   ███  ████    █ █   ████ ████ .COM\n",
    "color: #d02670"
  );

  return (
    <UserProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}
