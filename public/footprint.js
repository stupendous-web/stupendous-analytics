// const react = require("react");
// const extractDomain = require("extract-domain");
// const { getCookie, hasCookie, setCookie } = require("cookies-next");
// const axios = require("axios");
//
// module.exports = function StupendousAnalytics({ site }) {
//     react.useEffect(() => {
//         const hostname = document.location.hostname;
//         const path = document.location.pathname;
//         const host = extractDomain(document.referrer);
//         const referrer = document.referrer;
//         const height = window.innerHeight;
//         const width = window.innerWidth;
//         const localTimestamp = new Date();
//         !hasCookie("stupendous_analytics") &&
//         setCookie("stupendous_analytics", uuidv4());
//         const session = getCookie("stupendous_analytics");
//
//         const data = {
//             site: site,
//             hostname: hostname,
//             path: path,
//             host: host || "Direct",
//             referrer: referrer,
//             height: height,
//             width: width,
//             localTimestamp: localTimestamp,
//             session: session,
//         };
//
//         axios
//             .post("https://stupendousanalytics.com/api/pageviews", data)
//             .catch((error) => console.log("Stupendous Analytics Error:", error));
//     });
//
//     return null;
// };

const site = new URLSearchParams(document.currentScript.src.split("?")[1]).get(
  "site"
);

const data = {
  site,
  hostname: document.location.hostname,
  path: document.location.pathname,
  host: document.location.hostname || "Direct",
  referrer: document.referrer,
  height: window.innerHeight,
  width: window.innerWidth,
  localTimestamp: new Date(),
  // session: session,
};

console.log(data);

window.addEventListener("locationchange", function () {
  console.log("location changed!");
});

//   axios
//     .post("/api/pageviews", data)
//     .catch((error) => console.log("Stupendous Analytics Error:", error));
