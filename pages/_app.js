import uikit from "uikit"; // TODO: Remove
import { Provider } from "../lib/context";
import { SessionProvider } from "next-auth/react";
import "remixicon/fonts/remixicon.css";
import { Box, ChakraBaseProvider } from "@chakra-ui/react";

import theme from "../utils/chakraHelper";
import Navigation from "../components/Navigation";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  console.log("%c🦸 Visit stupendousweb.com for more!", "color: #d02670");

  return (
    <ChakraBaseProvider theme={theme}>
      <SessionProvider session={session}>
        <Provider>
          <Navigation />
          <Box
            h={"calc(100vh - 64px)"}
            w={"100%"}
            style={{ overflowY: "auto" }}
          >
            <Component {...pageProps} />
          </Box>
        </Provider>
      </SessionProvider>
    </ChakraBaseProvider>
  );
}
