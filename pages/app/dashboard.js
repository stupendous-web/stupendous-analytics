import { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useGlobal } from "../../lib/context";
import { groupBy } from "../../utils/helpers";
import { getPageviews } from "../../utils/api";

import Overview from "../../components/Overview";
import Referrers from "../../components/Referrers";
import Paths from "../../components/Paths";
import Screens from "../../components/Screens";
import { Card, Container, SimpleGrid, SkeletonText } from "@chakra-ui/react";
// import Hours from "../../components/Hours";

export default function Dashboard() {
  const {
    isLoading,
    setIsLoading,
    startDate,
    endDate,
    host,
    pageviews,
    setPageviews,
    setFilteredPageviews,
    setHostOptions,
  } = useGlobal();

  const { data: session } = useSession();
  const site = session?.user?.sites?.[0]?._id;

  useEffect(() => {
    host
      ? setFilteredPageviews(
          pageviews?.filter((pageview) => pageview?.host === host)
        )
      : setFilteredPageviews(pageviews);
    setHostOptions(groupBy(pageviews, "host"));
  }, [pageviews, host]);

  useEffect(() => {
    setIsLoading(true);
    site &&
      getPageviews({
        site: site,
        startDate: startDate,
        endDate: endDate,
      })
        .then((results) => {
          setPageviews(results);
        })
        .finally(() => setIsLoading(false));
  }, [site, startDate, endDate]);

  return (
    <>
      <Head>
        <title>
          Dashboard | NextJS Website Analytics Dashboard | Stupendous Web
        </title>
      </Head>
      <Container maxW={"container.xl"} py={4}>
        <Card h={"350px"} w={"100%"} p={4} mb={4}>
          {isLoading ? (
            <SkeletonText noOfLines={4} spacing={4} />
          ) : (
            <Overview />
          )}
        </Card>
        <SimpleGrid columns={2} spacing={4} mb={4}>
          <Card p={4}>
            {isLoading ? (
              <SkeletonText noOfLines={4} spacing={4} />
            ) : (
              <Referrers />
            )}
          </Card>
          <Card p={4}>
            {isLoading ? <SkeletonText noOfLines={4} spacing={4} /> : <Paths />}
          </Card>
        </SimpleGrid>
        <Card w={"100%"} p={4} mb={4}>
          {isLoading ? <SkeletonText noOfLines={4} spacing={4} /> : <Screens />}
        </Card>
      </Container>
    </>
  );
}
