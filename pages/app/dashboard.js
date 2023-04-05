import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGlobal } from "../../lib/context";
import { groupBy } from "../../utils/helpers";
import { getPageviews } from "../../utils/api";

import Layout from "../../components/Layout";
import Overview from "../../components/Overview";
import Referrers from "../../components/Referrers";
import Paths from "../../components/Paths";
import Screens from "../../components/Screens";
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
    filteredPageviews,
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
      <Layout>
        <div className={"uk-section uk-section-small"}>
          <div className={"uk-container uk-container-expand"}>
            <div className={"uk-grid-match"} data-uk-grid={""}>
              <div className={"uk-width-1-2"}>
                <div
                  className={
                    "uk-card uk-card-primary uk-card-body uk-text-center"
                  }
                >
                  <h1 className={"uk-heading-large uk-margin-remove"}>
                    {groupBy(filteredPageviews, "session")?.length || 0}
                  </h1>
                  <p>Sessions</p>
                </div>
              </div>
              <div className={"uk-width-1-2"}>
                <div
                  className={
                    "uk-card uk-card-primary uk-card-body uk-text-center"
                  }
                >
                  <h1 className={"uk-heading-large uk-margin-remove"}>
                    {filteredPageviews?.length || 0}
                  </h1>
                  <p>Pageviews</p>
                </div>
              </div>
              <div className={"uk-width-1-1"}>
                <div className={"uk-card uk-card-default uk-card-body"}>
                  <Overview />
                </div>
              </div>
              <div className={"uk-width-1-1"}>
                <div className={"uk-card uk-card-default uk-card-body"}>
                  <Referrers />
                </div>
              </div>
              <div className={"uk-width-1-1"}>
                <div className={"uk-card uk-card-default uk-card-body"}>
                  <Paths />
                </div>
              </div>
              <div className={"uk-width-1-1"}>
                <div className={"uk-card uk-card-default uk-card-body"}>
                  <Screens />
                  {/*
          <Hours />
          */}
                </div>
              </div>
              {isLoading && (
                <div
                  className={
                    "uk-width-1-1 uk-section-default uk-flex uk-flex-center uk-flex-middle uk-position-fixed"
                  }
                  data-uk-height-viewport={""}
                  style={{ top: 0, left: 0 }}
                >
                  Loading...
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
