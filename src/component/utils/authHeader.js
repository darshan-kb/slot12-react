const authHeader = () => {
  let token = sessionStorage.getItem("id_token");
  let headers = new Headers();
  headers.set("Content-type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  return headers;
};
export default authHeader;
