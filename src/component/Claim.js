import { useContext, useEffect, useState } from "react";
import CNavbar from "./CNavbar";
import useGetBalance from "./utils/hooks/useGetBalance";
import UserContext from "./utils/UserContext";

function balance(balance) {
  const token = sessionStorage.getItem("id_token");
  const headers = new Headers();
  headers.set("Content-type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    mode: "cors",
    headers: headers,
  };
  fetch(process.env.REACT_APP_ACCOUNT_BALANCE, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function SingleClaim({
  claimId,
  gameId,
  ticketId,
  betNumber,
  betAmount,
  claimAmount,
  redeem,
}) {
  return (
    <tr>
      <td style={{ color: "black", width: "100px" }}>{gameId}</td>
      <td style={{ color: "black", width: "100px" }}>{ticketId}</td>
      <td style={{ color: "black", width: "100px" }}>{claimId}</td>
      <td style={{ color: "black", width: "100px" }}>{betNumber}</td>
      <td style={{ color: "black", width: "100px" }}>{betAmount}</td>
      <td style={{ color: "black", width: "120px" }}>{claimAmount}</td>
      <td style={{ color: "black", width: "120px" }}>
        <button style={{ width: "100px", height: "25px" }} onClick={redeem}>
          {" "}
          Claim{" "}
        </button>
      </td>
    </tr>
  );
}
const Claim = () => {
  const [claims, setClaims] = new useState([]);
  //   const [balance, setBalance] = new useState(0);
  const { balance, setBalance } = useContext(UserContext);
  //setBalance(useGetBalance());
  let token = sessionStorage.getItem("id_token");
  let headers = new Headers();
  headers.set("Content-type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  function redeemClaim(claimId) {
    console.log(claimId);
    var requestOptions = {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({ claimId: claimId }),
    };
    fetch(process.env.REACT_APP_GAME_CLAIM, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result + "here");
        setBalance(result);
      })
      .catch((error) => console.log("error", error));
  }
  //   useEffect(() => {
  //     var requestOptions = {
  //       method: "GET",
  //       mode: "cors",
  //       headers: headers,
  //     };
  //     fetch(process.env.REACT_APP_ACCOUNT_BALANCE, requestOptions)
  //       .then((response) => response.text())
  //       .then((result) => setBalance(JSON.parse(result)))
  //       .catch((error) => console.log("error", error));
  //   }, []);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      mode: "cors",
      headers: headers,
    };
    fetch(process.env.REACT_APP_GAME_CLAIM, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        let res = JSON.parse(result);
        setClaims(res);
      })
      .catch((error) => console.log("error", error));
  }, [balance]);

  return (
    <>
      {/* <div>{balance}</div> */}
      <CNavbar balance={balance} theme={"black"}></CNavbar>
      <div style={{ marginTop: "5%", marginLeft: "20%" }}>
        <table>
          <thead>
            <tr>
              <th style={{ color: "black", width: "100px" }}>Game Id</th>
              <th style={{ color: "black", width: "100px" }}>Ticket Id</th>
              <th style={{ color: "black", width: "100px" }}>Claim Id</th>
              <th style={{ color: "black", width: "100px" }}>Bet Name</th>
              <th style={{ color: "black", width: "100px" }}>Bet Amount</th>
              <th style={{ color: "black", width: "120px" }}>Claim Amount</th>
              <th style={{ color: "black", width: "120px" }}>Claim</th>
            </tr>

            {claims.map((claim) => {
              //console.log(claim.claimId);
              return (
                <SingleClaim
                  key={claim.claimId}
                  claimId={claim.claimId}
                  gameId={claim.gameId}
                  ticketId={claim.ticketId}
                  betNumber={claim.betNumber}
                  betAmount={claim.betAmount}
                  claimAmount={claim.claimAmount}
                  redeem={() => redeemClaim(claim.claimId)}
                ></SingleClaim>
              );
            })}
          </thead>
        </table>
      </div>
    </>
  );
};
export default Claim;
