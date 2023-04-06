import { useGlobal } from "../lib/context";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

export default function Filters() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    hostOptions,
    host,
    setHost,
  } = useGlobal();

  const handleSelect = (range) => {
    setStartDate(range?.startDate);
    setEndDate(range?.endDate);
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
          data-uk-dropdown="mode: click; pos: bottom-right; offset: 28"
        >
          <DateRangePicker
            ranges={[
              {
                startDate: startDate,
                endDate: endDate,
                key: "selection",
                color: "#d02670",
              },
            ]}
            onChange={(ranges) => handleSelect(ranges?.selection)}
          />
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
