import { useContext, useEffect, useState } from "react";
import { demo } from "../links/demo";
import CNavbar from "./CNavbar";
import { jwtDecode } from "jwt-decode";
import UserContext from "./utils/UserContext";
import useGetBalance from "./utils/hooks/useGetBalance";
const Home = () => {
  const { setBalance, setIsAdmin, setIsAuthorized } = useContext(UserContext);
  const bal = useGetBalance();
  setBalance(bal);
  const token = sessionStorage.getItem("id_token");
  if (token !== null) {
    const decodedToken = jwtDecode(token);
    if (
      decodedToken.authorities.includes("ROLE_ADMIN") ||
      decodedToken.authorities.includes("ROLE_USER")
    )
      setIsAuthorized(true);
    if (decodedToken.authorities.includes("ROLE_ADMIN")) setIsAdmin(true);
  }
  return (
    <>
      <CNavbar theme={"black"} headingflag={true} />
    </>
  );
};

export default Home;
