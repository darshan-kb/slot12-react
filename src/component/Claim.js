import { useContext, useEffect, useState } from "react";
import CNavbar from "./CNavbar";
import useGetBalance from "./utils/hooks/useGetBalance";
import UserContext from "./utils/UserContext";
import "../css/claim.css";

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
      <td>{gameId}</td>
      <td>{ticketId}</td>
      <td>{claimId}</td>
      <td>{betNumber}</td>
      <td>{betAmount}</td>
      <td>{claimAmount}</td>
      <td>
        <button onClick={redeem}> Claim </button>
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
      <CNavbar balance={balance}></CNavbar>
      <div className="claims">
        <table className="claimstable">
          <thead>
            <tr>
              <th>Game Id</th>
              <th>Ticket Id</th>
              <th>Claim Id</th>
              <th>Bet Name</th>
              <th>Bet Amount</th>
              <th>Claim Amount</th>
              <th>Claim</th>
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
