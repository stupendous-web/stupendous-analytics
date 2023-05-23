import { useEffect, useState } from "react";
import { useGlobal } from "../lib/context";
import { Chart } from "react-chartjs-2";
import { groupBy } from "../utils/helpers";
import { searchEngines } from "../utils/searchEngines";
import { socialMedia } from "../utils/socialMedia";
import { syndication } from "../utils/syndication";
import {
  Box,
  Heading,
  SimpleGrid,
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
      <SimpleGrid columns={2} spacing={4} w={"66.66%"} mb={4}>
        <Box>
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
        <Box>
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
      </SimpleGrid>
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
                  <Td>{row.host}</Td>
                  <Td>{row.sessions}</Td>
                  <Td>{row.pageviews}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
