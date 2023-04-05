import { useEffect, useState } from "react";
import { useGlobal } from "../lib/context";
import { Chart } from "react-chartjs-2";
import { groupBy } from "../utils/helpers";
import { searchEngines } from "../utils/searchEngines";
import { socialMedia } from "../utils/socialMedia";
import { syndication } from "../utils/syndication";

export default function Referrers() {
  const { filteredPageviews, chartColors } = useGlobal();

  const [rows, setRows] = useState();

  useEffect(() => {
    if (filteredPageviews) {
      const groupedPageviews = groupBy(filteredPageviews, "host");
      const data = groupedPageviews?.map((pageview) => {
        return {
          host: pageview[0],
          fullReferrers: groupBy(
            pageview[1].filter((fullReferrer) =>
              fullReferrer.referrer.includes(pageview[0])
            ),
            `referrer`
          ),
          sessions: groupBy(pageview[1], "session")?.length,
          pageviews: pageview[1]?.length,
        };
      });
      setRows(data.sort((a, b) => (a?.sessions < b?.sessions ? 1 : -1)));
    }
  }, [filteredPageviews]);

  return (
    <>
      <h2 id={"sources"}>Sources</h2>
      <div data-uk-grid={""}>
        <div className={"uk-width-auto"}>
          <table
            className={
              "uk-table uk-table-divider uk-table-hover uk-table-small uk-table-responsive"
            }
          >
            <thead>
              <tr>
                <th>Location</th>
                <th>Sessions</th>
                <th>Pageviews</th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row) => {
                return (
                  <tr key={row.hsot}>
                    <td>
                      <div className={"uk-inline"}>
                        <div>
                          {row.host}{" "}
                          {row.fullReferrers.length > 1 && (
                            <a>
                              <i className={"ri-arrow-drop-down-fill"} />
                            </a>
                          )}
                        </div>
                        {row.fullReferrers.length > 1 && (
                          <div data-uk-dropdown={"mode: click"}>
                            {row.fullReferrers.map((item) => (
                              <div key={item[0]}>{item[0]}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{row.sessions}</td>
                    <td>{row.pageviews}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={"uk-width-auto"}>
          <p className={"uk-text-bold uk-margin-small-top"}>
            Pageviews per Type
          </p>
          <Chart
            type={"doughnut"}
            data={{
              labels: ["Search", "Social", "Advertising", "Direct", "Other"],
              datasets: [
                {
                  data: [
                    filteredPageviews?.filter((pageview) =>
                      searchEngines.includes(pageview?.host)
                    )?.length,
                    filteredPageviews?.filter((pageview) =>
                      socialMedia.includes(pageview?.host)
                    )?.length,
                    filteredPageviews?.filter((pageview) =>
                      syndication.includes(pageview?.host)
                    )?.length,
                    filteredPageviews?.filter(
                      (pageview) => pageview?.host === "Direct"
                    )?.length,
                    filteredPageviews?.filter(
                      (pageview) =>
                        !searchEngines.includes(pageview?.host) &&
                        !socialMedia.includes(pageview?.host) &&
                        !syndication.includes(pageview?.host) &&
                        pageview?.host !== "Direct"
                    )?.length,
                  ],
                  backgroundColor: chartColors,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <div className={"uk-width-auto"}>
          <p className={"uk-text-bold uk-margin-small-top"}>
            Sessions per Location
          </p>
          <Chart
            type={"doughnut"}
            data={{
              labels: rows?.map((row) => row.host),
              datasets: [
                {
                  data: rows?.map((row) => row.sessions),
                  backgroundColor: chartColors,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
