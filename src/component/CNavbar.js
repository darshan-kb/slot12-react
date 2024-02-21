import { React, useContext, useEffect, useState } from "react";
import { demo } from "../links/demo";
import "../css/navbar.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import useGetUser from "./utils/hooks/useGetUser";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./utils/UserContext";
const CNavbar = ({ theme, headingflag }) => {
  let [flag, setFlag] = useState(
    sessionStorage.getItem("id_token") == null ? false : true
  );
  const user = useGetUser();
  const { balance, isAdmin, isAuthorized, setIsAuthorized, setIsAdmin } =
    useContext(UserContext);
  const navigate = useNavigate();
  console.log(balance);
  const logout = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("id_token");
    setIsAdmin(false);
    setIsAuthorized(false);
    setFlag(false);
    window.location.href = "/";
  };
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
          {isAuthorized && (
            <div className="optiondiv">
              <select onChange={(e) => gameSelectDropdown(e.target.value)}>
                <option value={"/"}>Game</option>
                <option value={"/spin"}>Spin</option>
                <option value={"/slotmachine"}>Slot</option>
              </select>
            </div>
          )}
          {isAuthorized && (
            <div className="navelement">
              <Link to="/claims">Claims</Link>
            </div>
          )}
          {isAdmin && (
            <select onChange={(e) => adminDropdown(e.target.value)}>
              <option value={"/"}>Admin</option>
              <option value={"/recharge"}>Recharge</option>
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
