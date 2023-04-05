import { useEffect, useState } from "react";
import { useGlobal } from "../lib/context";
import { Chart } from "react-chartjs-2";
import { groupBy } from "../utils/helpers";

export default function Paths() {
  const { filteredPageviews, chartColors } = useGlobal();

  const [rows, setRows] = useState();

  useEffect(() => {
    if (filteredPageviews) {
      const groupedPageviews = groupBy(filteredPageviews, "path");
      const data = groupedPageviews?.map((pageview) => {
        return {
          path: pageview[0],
          sessions: groupBy(pageview[1], "session")?.length,
          pageviews: pageview[1]?.length,
        };
      });
      setRows(data.sort((a, b) => (a?.sessions < b?.sessions ? 1 : -1)));
    }
  }, [filteredPageviews]);

  return (
    <>
      <h2 id={"pages"}>Pages</h2>
      <div data-uk-grid={""}>
        <div className={"uk-width-auto"}>
          <table
            className={
              "uk-table uk-table-divider uk-table-hover uk-table-small uk-table-responsive"
            }
          >
            <thead>
              <tr>
                <th>Page</th>
                <th>Sessions</th>
                <th>Pageviews</th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row, key) => {
                return (
                  <tr key={key}>
                    <td>{row?.path}</td>
                    <td>{row?.sessions}</td>
                    <td>{row?.pageviews}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={"uk-width-auto"}>
          <p className={"uk-text-bold uk-margin-small-top"}>
            Sessions per Page
          </p>
          <Chart
            type={"doughnut"}
            data={{
              labels: rows?.map((row) => row?.path),
              datasets: [
                {
                  data: rows?.map((row) => row?.sessions),
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
            Pageviews per Page
          </p>
          <Chart
            type={"doughnut"}
            data={{
              labels: rows?.map((row) => row?.path),
              datasets: [
                {
                  data: rows?.map((row) => row?.pageviews),
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
