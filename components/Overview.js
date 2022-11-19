import { useGlobal } from "../lib/context";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import dayjs from "dayjs";
import { groupBy } from "../utils/helpers";

export default function Overview() {
  const { filteredPageviews } = useGlobal();

  let rows = filteredPageviews?.map((pageview) => {
    return pageview?.createdAt
      ? {
          ...pageview,
          createdAt: dayjs(pageview?.createdAt).startOf("day").toDate(),
        }
      : null;
  });
  rows = rows?.filter((row) => row);
  rows = groupBy(rows, "createdAt");
  rows = rows?.map((row) => {
    return {
      date: row[0],
      sessions: groupBy(row[1], "session")?.length - 1,
      pageviews: row[1]?.length - 1,
    };
  });
  rows = rows.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));

  return (
    <>
      <div className={"uk-height-medium"}>
        <Chart
          type={"line"}
          data={{
            labels: rows?.map((row) => dayjs(row.date).format("M-D-YY")),
            datasets: [
              {
                label: "Pageivews",
                data: rows?.map((row) => row?.pageviews),
                borderColor: "rgba(159, 24, 83, 1)",
                backgroundColor: "rgba(159, 24, 83, .1)",
                fill: true,
              },
              {
                label: "Sessions",
                data: rows?.map((row) => row?.sessions),
                borderColor: "rgba(159, 24, 83, 1)",
                backgroundColor: "rgba(159, 24, 83, .1)",
                fill: true,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </>
  );
}
