import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang={"en"}>
      <Head>
        <Script strategy={"lazyOnload"} src={"/footprint.js?site=1234"} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
