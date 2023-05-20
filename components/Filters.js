import { useEffect, useState } from "react";
import { useGlobal } from "../lib/context";

import { DateRangePicker } from "react-date-range";
import { RiCalendarFill } from "react-icons/ri";
import { Box, Text, Icon, Select, Flex } from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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
      <Flex
        align={"center"}
        minW={"fit-content"}
        color={"primary.500"}
        cursor={"pointer"}
        mr={4}
        onClick={() => setIsShowingDateRange(!isShowingDateRange)}
      >
        Date Range&nbsp;
        <Icon as={RiCalendarFill} />
      </Flex>
      {isShowingDateRange && (
        <Box
          bg={"white"}
          boxShadow={"md"}
          position={"absolute"}
          p={2}
          borderRadius={"sm"}
          top={"80px"}
          right={8}
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
          <Text
            color={"primary.500"}
            fontWeight={"bold"}
            align={"left"}
            my={2}
            cursor={"pointer"}
            onClick={() => {
              setIsLoading(true);
              setIsShowingDateRange(false);
              setStartDate(localStartDate);
              setEndDate(localEndDate);
            }}
          >
            Apply
          </Text>
        </Box>
      )}
      <Select
        mr={4}
        onChange={(event) => setHost(event.target.value)}
        value={host}
      >
        <option value={""}>All Sources</option>
        {hostOptions?.map((hostOption) => (
          <option key={hostOption} value={hostOption[0]}>
            {hostOption[0]}
          </option>
        ))}
      </Select>
    </>
  );
}
