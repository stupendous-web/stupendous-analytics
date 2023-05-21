import { useEffect, useState } from "react";
import { useGlobal } from "../lib/context";
import { Chart } from "react-chartjs-2";
import { groupBy } from "../utils/helpers";
import { searchEngines } from "../utils/searchEngines";
import { socialMedia } from "../utils/socialMedia";
import { syndication } from "../utils/syndication";
import { RiArrowDropDownFill } from "react-icons/ri";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

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
      <Heading id={"sources"}>Sources</Heading>
      <Flex>
        <Box w={"50%"}>
          <TableContainer>
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th>Location</Th>
                  <Th>Sessions</Th>
                  <Th>Pageviews</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rows?.map((row) => {
                  return (
                    <Tr key={row.hsot}>
                      <Td>
                        {row.host}{" "}
                        {row.fullReferrers.length > 1 && (
                          <Popover>
                            <PopoverTrigger>
                              <Icon as={RiArrowDropDownFill} />
                            </PopoverTrigger>
                            <PopoverContent>
                              {row.fullReferrers.map((item) => (
                                <li key={item[0]}>{item[0]}</li>
                              ))}
                            </PopoverContent>
                          </Popover>
                        )}
                      </Td>
                      <Td>{row.sessions}</Td>
                      <Td>{row.pageviews}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box w={"25%"} px={4}>
          <Text>Pageviews per Type</Text>
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
        </Box>
        <Box w={"25%"} px={4}>
          <Text>Sessions per Location</Text>
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
        </Box>
      </Flex>
    </>
  );
}
