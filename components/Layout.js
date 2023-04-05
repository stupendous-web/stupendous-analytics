import Navigation from "./Navigation";
import SideNavigation from "./SideNavigation";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <div data-uk-grid={""}>
        <SideNavigation />
        <div
          className={"uk-width-expand"}
          style={{ height: "calc(100vh - 4rem)", overflow: "auto" }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
