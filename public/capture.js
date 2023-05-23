// const react = require("react");
// const extractDomain = require("extract-domain");
// const { getCookie, hasCookie, setCookie } = require("cookies-next");
// const { v4: uuidv4 } = require("uuid");
// const axios = require("axios");
//
// module.exports = function StupendousAnalytics({ site }) {
//     react.useEffect(() => {
//         const host = extractDomain(document.referrer);
//         const localTimestamp = new Date();
//         !hasCookie("stupendous_analytics") &&
//         setCookie("stupendous_analytics", uuidv4());
//         const session = getCookie("stupendous_analytics");
//
//         axios
//             .post("https://stupendousanalytics.com/api/pageviews", data)
//             .catch((error) => console.log("Stupendous Analytics Error:", error));
//     });
//
//     return null;
// };
// const { axios } = require("axios");

// <script>
//   const site ='642cf18729b904f37d859011';
// </script>
// <script src="https://stupendousanalytics/footprint.js"></script>

const data = {
  site: site,
  hostname: document.location.hostname,
  path: document.location.pathname,
  // host: document.location.hostname || "Direct",
  referrer: document.referrer,
  height: window.innerHeight,
  width: window.innerWidth,
  localTimestamp: new Date(),
  // session: session,
};
console.log(data);
