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
import { Card, Container, SimpleGrid } from "@chakra-ui/react";
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
          <Overview />
        </Card>
        <SimpleGrid columns={2} spacing={4}>
          <Card p={4}>
            <Referrers />
          </Card>
          <Card p={4}>
            <Paths />
          </Card>
        </SimpleGrid>
      </Container>
      {/*<div className={"uk-section uk-section-small"}>*/}
      {/*  <div className={"uk-container uk-container-expand"}>*/}
      {/*    <div className={"uk-grid-match"} data-uk-grid={""}>*/}
      {/*      <div className={"uk-width-auto"}>*/}
      {/*        <div className={"uk-card uk-card-default uk-card-body"}>*/}
      {/*          <Paths />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className={"uk-width-auto"}>*/}
      {/*        <div className={"uk-card uk-card-default uk-card-body"}>*/}
      {/*          <Screens />*/}
      {/*          /!**/}
      {/*    <Hours />*/}
      {/*    *!/*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      {isLoading && (*/}
      {/*        <div*/}
      {/*          className={*/}
      {/*            "uk-width-1-1 uk-section-default uk-flex uk-flex-center uk-flex-middle uk-position-fixed"*/}
      {/*          }*/}
      {/*          data-uk-height-viewport={""}*/}
      {/*          style={{ top: 0, left: 0 }}*/}
      {/*        >*/}
      {/*          Loading...*/}
      {/*        </div>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
