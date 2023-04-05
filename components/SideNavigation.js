export default function SideNavigation() {
  const links = [
    {
      href: "sources",
      heading: "Sources",
      icon: "ri-earth-fill",
      description: "These are websites that refer visitors to yours.",
    },
    {
      href: "pages",
      heading: "Pages",
      icon: "ri-pages-fill",
      description: "These are your most popular pages.",
    },
    {
      href: "screens",
      heading: "Screens",
      icon: "ri-computer-fill",
      description: "These are the devices your visitors use.",
    },
  ];

  return (
    <>
      <div
        className={"uk-width-auto"}
        style={{ borderRight: "solid 1px #e0e0e0" }}
      >
        <div className={"uk-section"}>
          {links.map((link, key) => {
            return (
              <div
                className={"uk-width-1-1 uk-inline"}
                data-uk-scrollspy-nav={"scroll: true; offset: 56"}
                key={key}
              >
                <a href={"#" + link.href}>
                  <p
                    className={"uk-text-center"}
                    style={{ fontSize: "1.5rem" }}
                  >
                    <i className={link.icon} />
                  </p>
                </a>
                <div
                  className={"speech-bubble-1"}
                  data-uk-dropdown="pos: right-top; offset: -14"
                >
                  <p className={"uk-text-bold"} style={{ color: "inherit" }}>
                    {link.heading}
                  </p>
                  <p>{link.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
