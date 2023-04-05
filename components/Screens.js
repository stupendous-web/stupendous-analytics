import { useGlobal } from "../lib/context";
import { Chart } from "react-chartjs-2";

export default function Screens() {
  const { filteredPageviews, chartColors } = useGlobal();

  const portrait = filteredPageviews?.filter(
    (pageview) => pageview?.height > pageview?.width
  )?.length;
  const landscape = filteredPageviews?.filter(
    (pageview) => pageview?.height < pageview?.width
  )?.length;
  const square = filteredPageviews?.filter(
    (pageview) => pageview?.height === pageview?.width
  )?.length;

  return (
    <>
      <h2 id={"screens"}>Screens</h2>
      <div data-uk-grid={""}>
        <div className={"uk-width-auto"}>
          <table
            className={
              "uk-table uk-table-divider uk-table-hover uk-table-small uk-table-responsive"
            }
          >
            <thead>
              <tr>
                <th>Size</th>
                <th>Pageviews</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <i className={"ri-smartphone-fill uk-margin-right"} />
                  &nbsp; Portrait
                </td>
                <td>{portrait}</td>
              </tr>
              <tr>
                <td>
                  <i className={"ri-computer-fill uk-margin-right"} />
                  &nbsp; Landscape
                </td>
                <td>{landscape}</td>
              </tr>
              <tr>
                <td>
                  <i className={"ri-percent-fill uk-margin-right"} />
                  &nbsp; Square
                </td>
                <td>{square}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={"uk-width-auto"}>
          <p className={"uk-text-bold uk-margin-small-top"}>
            Pageviews per Screen
          </p>
          <Chart
            type={"doughnut"}
            data={{
              labels: ["Portrait", "Landscape", "Square"],
              datasets: [
                {
                  data: [portrait, landscape, square],
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
