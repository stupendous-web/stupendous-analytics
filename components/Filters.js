import { useEffect, useState } from "react";
import { useGlobal } from "../lib/context";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Box, Flex } from "@chakra-ui/react";

export default function Filters() {
  const [isShowingDateRange, setIsShowingDateRange] = useState(false);
  const [localStartDate, setLocalStartDate] = useState();
  const [localEndDate, setLocalEndDate] = useState();
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    hostOptions,
    host,
    setHost,
    setIsLoading,
  } = useGlobal();

  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  }, [startDate, endDate]);

  const handleSelect = (range) => {
    setLocalStartDate(range?.startDate);
    setLocalEndDate(range?.endDate);
  };

  return (
    <>
      <a
        className={"uk-flex uk-flex-middle uk-height-1-1"}
        onClick={() => setIsShowingDateRange(!isShowingDateRange)}
      >
        Date Range&nbsp;
        <i className={"ri-calendar-fill"} />
      </a>
      {isShowingDateRange && (
        <div
          className={
            "uk-background-muted uk-box-shadow-small uk-position-absolute uk-padding"
          }
          style={{ borderRadius: ".5rem", top: 43, right: 0 }}
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
                setIsShowingDateRange(false);
                setStartDate(localStartDate);
                setEndDate(localEndDate);
              }}
            >
              Apply
            </a>
          </p>
        </div>
      )}
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
    </>
  );
}
