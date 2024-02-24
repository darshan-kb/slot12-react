import { useEffect, useContext } from "react";
import authHeader from "../authHeader";
import UserContext from "../UserContext";
const useGetBalance = () => {
  const { setBalance } = useContext(UserContext);
  let headers = authHeader();
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      mode: "cors",
      headers: headers,
    };
    fetch(process.env.REACT_APP_ACCOUNT_BALANCE, requestOptions)
      .then((response) => response.text())
      .then((result) => setBalance(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);
};
export default useGetBalance;
