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
          sessions: groupBy(pageview[1], "session")?.length - 1,
          pageviews: pageview[1]?.length - 1,
        };
      });
      setRows(data.sort((a, b) => (a?.sessions < b?.sessions ? 1 : -1)));
    }
  }, [filteredPageviews]);

  return (
    <>
      <h2 id={"sources"}>Sources</h2>
      <div data-uk-grid={""}>
        <div className={"uk-width-1-2@s"}>
          <table
            className={
              "uk-table uk-table-striped uk-table-hover uk-table-small uk-table-responsive"
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
                    <td>{row.host} </td>
                    <td>{row.sessions}</td>
                    <td>{row.pageviews}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={"uk-width-1-4@s"}>
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
        <div className={"uk-width-1-4@s"}>
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
