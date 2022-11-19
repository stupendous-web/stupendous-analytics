import { useGlobal } from "../lib/context";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function Hours() {
  const { pageviews } = useGlobal();
  const hours = pageviews?.hours;

  return (
    <>
      <h2 id={"Hours"}>Hours</h2>
      <p>
        These are popular hours in a day that people visit your website. All
        times are local. Hours are based on a 24-hour format.
      </p>
      <div className={"uk-height-medium"}>
        <Chart
          type={"bar"}
          data={{
            labels: hours?.map((hour) => {
              if (hour?.hour === "") {
                return "Unknown";
              } else if (hour?.hour === 0) {
                return 12 + "AM";
              } else if (hour?.hour > 12) {
                return hour?.hour - 12 + "PM";
              } else if (hour?.hour === 12) {
                return hour?.hour + "PM";
              } else {
                return hour?.hour + "AM";
              }
            }),
            datasets: [
              {
                label: "Pageivews",
                data: hours?.map((hour) => hour?.pageviews),
                backgroundColor: "rgba(236, 0, 140, 1)",
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
