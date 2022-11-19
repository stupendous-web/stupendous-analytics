import axios from "axios";
import UIkit from "uikit";

export const getPageviews = async (params) => {
  return await axios
    .get("/api/pageviews", {
      params: params,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      UIkit.notification({
        message: "There was an error. Some of your data is missing.",
        status: "danger",
      });
      console.error(error);
      return [];
    });
};
