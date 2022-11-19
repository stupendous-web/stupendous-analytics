import uikit from "uikit";
import "../styles/uikit/uikit.css";
import { Provider } from "../lib/context";
import { UserProvider } from "@auth0/nextjs-auth0";
import "remixicon/fonts/remixicon.css";

export default function MyApp({ Component, pageProps }) {
  console.log(
    "%c  ___ _                          _            __      __   _    \n" +
      " / __| |_ _  _ _ __  ___ _ _  __| |___ _  _ __\\ \\    / /__| |__ \n" +
      " \\__ \\  _| || | '_ \\/ -_) ' \\/ _` / _ \\ || (_-<\\ \\/\\/ / -_) '_ \\\n" +
      " |___/\\__|\\_,_| .__/\\___|_||_\\__,_\\___/\\_,_/__/ \\_/\\_/\\___|_.__/.COM\n" +
      "              |_|                                               ",
    "color: #ec008c"
  );
  return (
    <UserProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}
