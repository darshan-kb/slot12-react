import { useState, useEffect } from "react";
import authHeader from "../authHeader";
const useGetBalance = () => {
  const [bal, setBal] = new useState(0);
  let headers = authHeader();
  //console.log(headers);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      mode: "cors",
      headers: headers,
    };
    fetch(process.env.REACT_APP_ACCOUNT_BALANCE, requestOptions)
      .then((response) => response.text())
      .then((result) => setBal(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);

  return bal;
};
export default useGetBalance;
