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
      { path: "/slotmachine", element: <Slotmachine /> },
      { path: "/login", element: <Login /> },
      { path: "/redirect", element: <Redirect /> },
      { path: "/authorized", element: <Redirect /> },
      { path: "/recharge", element: <Recharge /> },
      { path: "/fix", element: <Fix /> },
    ],
  },
]);
root.render(<RouterProvider router={appRouter} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
