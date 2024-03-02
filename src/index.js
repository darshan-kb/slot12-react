import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./component/Home";
import Claim from "./component/Claim";
import Slotmachine from "./component/Slotmachine";
import Login from "./component/Login";
import Redirect from "./component/Redirect";
import Recharge from "./component/Recharge";
import Fix from "./component/Fix";
import Report from "./component/Report";
import Game from "./component/spincomponents/Game";
import SpinClaim from "./component/spincomponents/SpinClaim";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/claims", element: <Claim /> },
      { path: "/spinclaims", element: <SpinClaim /> },
      { path: "/slotmachine", element: <Slotmachine /> },
      { path: "/login", element: <Login /> },
      { path: "/redirect", element: <Redirect /> },
      { path: "/authorized", element: <Redirect /> },
      { path: "/recharge", element: <Recharge /> },
      { path: "/fix", element: <Fix /> },
      { path: "/report", element: <Report /> },
      { path: "/spin", element: <Game /> },
    ],
  },
]);
root.render(<RouterProvider router={appRouter} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
