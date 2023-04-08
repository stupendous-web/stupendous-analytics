import { useGlobal } from "../lib/context";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import dayjs from "dayjs";
import UIkit from "uikit";

export default function Filters() {
  const { setStartDate, setEndDate, hostOptions, host, setHost, setIsLoading } =
    useGlobal();
  const [localStartDate, setLocalStartDate] = useState(
    dayjs().subtract(7, "days").toDate()
  );
  const [localEndDate, setLocalEndDate] = useState(
    dayjs().endOf("day").toDate()
  );

  const handleSelect = (range) => {
    setLocalStartDate(range?.startDate);
    setLocalEndDate(range?.endDate);
  };

  return (
    <>
      <div className={"uk-navbar-item"}>
        <a className={"uk-flex uk-flex-middle"}>
          Date Range&nbsp;
          <i className={"ri-calendar-fill"} />
        </a>
        <div
          className={"uk-box-shadow-small"}
          id={"dropdown"}
          data-uk-dropdown="mode: click; pos: bottom-right; offset: 28"
        >
          <DateRangePicker
            ranges={[
              {
                startDate: localStartDate,
                endDate: localEndDate,
                key: "selection",
                color: "#d02670",
              },
            ]}
            onChange={(ranges) => handleSelect(ranges?.selection)}
          />
          <p className={"uk-text-right uk-text-bold"}>
            <a
              onClick={() => {
                setIsLoading(true);
                const promise = new Promise((resolve) => {
                  UIkit.dropdown("#dropdown").hide();
                  resolve();
                });
                promise.then(() => {
                  setStartDate(localStartDate);
                  setEndDate(localEndDate);
                });
              }}
            >
              Apply
            </a>
          </p>
        </div>
      </div>
      <div className={"uk-navbar-item"}>
        <select
          className={"uk-select"}
          onChange={(event) => setHost(event.target.value)}
          value={host}
        >
          <option value={""}>All Sources</option>
          {hostOptions?.map((hostOption) => (
            <option key={hostOption} value={hostOption[0]}>
              {hostOption[0]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
