import { USER_URL } from "../Url";
import { useState, useEffect } from "react";

const useGetUser = () => {
  const [user, setUser] = useState("");
  const token = sessionStorage.getItem("id_token");
  const headers = new Headers();
  headers.set("Content-type", "plain/text");
  headers.set("Authorization", `Bearer ${token}`);
  useEffect(() => {
    const url = USER_URL;
    console.log(url);
    getUser(url).catch((error) => {
      console.log(error);
    });
  }, []);
  async function getUser(url) {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    if (response.status >= 200 && response.status <= 299) {
      const json = await response.text();
      setUser(json.split("@")[0]);
    } else {
      throw new Error(response.statusText);
    }
  }
  return user;
};
export default useGetUser;
