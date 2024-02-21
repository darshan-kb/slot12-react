import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Slotmachine from "./component/Slotmachine";
import Redirect from "./component/Redirect";
import Login from "./component/Login";
import Home from "./component/Home";
import Claim from "./component/Claim";
import Recharge from "./component/Recharge";
import CNavbar from "./component/CNavbar";
import UserContext from "./component/utils/UserContext";
import { useState } from "react";
function App() {
  const [balance, setBalance] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  return (
    // <div className="App">
    //   <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    //   <BrowserRouter>
    //   <Routes>
    //   <Route path="/login" element={<Login/>}></Route>
    //   <Route path='/slotmachine' element={<Slotmachine/>}></Route>
    //   <Route path="/redirect" element={<Redirect/>}></Route>
    //   <Route path="/authorized" element={<Redirect/>}></Route>
    //   <Route path="/" element={<Home/>}></Route>
    //   <Route path="/claims" element={<Claim/>}></Route>
    //   <Route path="/recharge" element={<Recharge/>}></Route>
    //   </Routes>

    //   </BrowserRouter>
    // </div>
    <>
      {/* <CNavbar></CNavbar> */}
      <UserContext.Provider
        value={{
          balance: balance,
          setBalance,
          isAdmin: isAdmin,
          setIsAdmin,
          isAuthorized: isAuthorized,
          setIsAuthorized,
        }}
      >
        <Outlet></Outlet>
      </UserContext.Provider>
    </>
  );
}

export default App;
