import { useEffect, useState } from "react";
import { useGlobal } from "../lib/context";
import { Chart } from "react-chartjs-2";
import { groupBy } from "../utils/helpers";
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
      <Heading id={"pages"}>Pages</Heading>

      <SimpleGrid columns={2} spacing={4} w={"66.66%"} mb={4}>
        <Box>
          <Text>Sessions per Page</Text>
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
        </Box>
        <Box>
          <Text>Pageviews per Page</Text>
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
        </Box>
      </SimpleGrid>
      <TableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Page</Th>
              <Th>Sessions</Th>
              <Th>Pageviews</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows?.map((row, key) => {
              return (
                <Tr key={key}>
                  <Td>{row?.path}</Td>
                  <Td>{row?.sessions}</Td>
                  <Td>{row?.pageviews}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
