import React, { useContext, useState } from "react";
import dayjs from "dayjs";

export const Context = React.createContext();

export const useGlobal = () => useContext(Context);

export const Provider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    dayjs().subtract(7, "days").toDate()
  );
  const [endDate, setEndDate] = useState(dayjs().endOf("day").toDate());
  const [hostOptions, setHostOptions] = useState();
  const [host, setHost] = useState();
  const [pageviews, setPageviews] = useState();
  const [filteredPageviews, setFilteredPageviews] = useState();

  const chartColors = [
    // "#fff0f7",
    // "#ffd6e8",
    "#ffafd2",
    "#ff7eb6",
    "#ee5396",
    "#d02670",
    "#9f1853",
    "#740937",
    "#510224",
    "#2a0a18",
  ];

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        hostOptions,
        setHostOptions,
        host,
        setHost,
        pageviews,
        setPageviews,
        filteredPageviews,
        setFilteredPageviews,
        chartColors,
      }}
    >
      {children}
    </Context.Provider>
  );
};
