import { React, useContext, useEffect, useState } from "react";
import { demo } from "../links/demo";
import "../css/navbar.css";
import { jwtDecode } from "jwt-decode";
import useGetUser from "./utils/hooks/useGetUser";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./utils/UserContext";
import useGetBalance from "./utils/hooks/useGetBalance";
const CNavbar = ({ theme, headingflag }) => {
  // let [flag, setFlag] = useState(
  //   sessionStorage.getItem("id_token") == null ? false : true
  // );
  const user = useGetUser();
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("id_token");
    setIsAdmin(false);
    setIsAuthorized(false);
    // setFlag(false);
    window.location.href = "/";
  };
  const { isAdmin, isAuthorized, balance, setIsAdmin, setIsAuthorized } =
    useContext(UserContext);
  useGetBalance();

  useEffect(() => {
    console.log("Here");
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
  }, []);

  const gameSelectDropdown = (e) => {
    navigate(e);
  };
  const adminDropdown = (e) => {
    navigate(e);
  };
  return (
    <>
      <div className="navbar2">
        <div className="newheading">Kazino</div>
        <div className="toolbar2">
          {isAuthorized && <div className="navelement">{user}</div>}
          <div className="navelement">
            <Link to="/">Home</Link>
          </div>
          {!isAuthorized && (
            <div className="navelement">
              <Link to="/login">Login</Link>
            </div>
          )}
          {
            <div className="optiondiv">
              <select onChange={(e) => gameSelectDropdown(e.target.value)}>
                <option value={"/"}>Game</option>
                <option value={"/spin"}>Spin</option>
                <option value={"/slotmachine"}>Slot</option>
              </select>
            </div>
          }
          {isAuthorized && (
            <div className="navelement">
              <Link to="/claims">Claims</Link>
            </div>
          )}
          {isAdmin && (
            <select onChange={(e) => adminDropdown(e.target.value)}>
              <option value={"/"}>Admin</option>
              <option value={"/recharge"}>Recharge</option>
              <option value={"/fix"}>Fix</option>
              <option value={"/report"}>Report</option>
            </select>
          )}
          {isAuthorized && (
            <div className="navelement">Balance : {balance}</div>
          )}
          {isAuthorized && (
            <div
              className="navelement"
              onClick={() => logout()}
              style={{ cursor: "pointer" }}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CNavbar;
