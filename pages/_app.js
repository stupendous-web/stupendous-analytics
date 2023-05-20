import uikit from "uikit"; // TODO: Remove
import { Provider } from "../lib/context";
import { SessionProvider } from "next-auth/react";
import "remixicon/fonts/remixicon.css";
import { ChakraBaseProvider } from "@chakra-ui/react"; // TODO: Remove

import theme from "../utils/chakraHelper";

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
    <ChakraBaseProvider theme={theme}>
      <SessionProvider session={session}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </ChakraBaseProvider>
  );
}
