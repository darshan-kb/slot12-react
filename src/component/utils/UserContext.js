import { createContext } from "react";
const UserContext = createContext({
  balance: 0,
  isAuthorized: false,
  isAdmin: false,
});
export default UserContext;
