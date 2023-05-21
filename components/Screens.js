import { useGlobal } from "../lib/context";
import {
  RiSmartphoneFill,
  RiComputerFill,
  RiPercentFill,
} from "react-icons/ri";
import {
  Heading,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function Screens() {
  const { filteredPageviews } = useGlobal();

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
      <Heading id={"screens"}>Screens</Heading>
      <TableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Size</Th>
              <Th>Pageviews</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Icon as={RiSmartphoneFill} />
                &nbsp; Portrait
              </Td>
              <Td>{portrait}</Td>
            </Tr>
            <Tr>
              <Td>
                <Icon as={RiComputerFill} />
                &nbsp; Landscape
              </Td>
              <Td>{landscape}</Td>
            </Tr>
            <Tr>
              <Td>
                <Icon as={RiPercentFill} />
                &nbsp; Square
              </Td>
              <Td>{square}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
