import CNavbar from "./CNavbar";
import "../css/recharge.css";
import { useState, useContext } from "react";
import UserContext from "./utils/UserContext";
const Recharge = () => {
  const [value, setValue] = useState(5);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enableOtpbox, setEnableOtpbox] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [otpId, setOtpId] = useState(0);
  const [error, setError] = useState("");
  let token = sessionStorage.getItem("id_token");
  let headers = new Headers();
  headers.set("Content-type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  const { isAuthorized, isAdmin } = useContext(UserContext);

  const onSubmit = () => {
    console.log(value + " " + email);
    var requestOptions = {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({ email: email, amount: value }),
    };
    fetch(process.env.REACT_APP_GAME_RECHARGE, requestOptions)
      .then((response) => {
        console.log(response.status);
        if (!response.ok) return Promise.reject(response);
        return response.json();
      })
      .then((result) => {
        console.log(result + " here");
        // result = JSON.parse(result.text());
        //console.log(result);
        // if(result.status!=200){
        //     console.log("here");
        //     throw result;
        // }
        setOtpId(parseInt(result));
        setEnableOtpbox(true);
        setIsFormDisabled(true);
        setIsButtonDisabled(true);
        setError("Otp sent on your email");
        // console.log(result);
        alert("Otp sent on your email");
      })
      .catch((error) => {
        if (typeof error.json === "function") {
          error
            .json()
            .then((jsonError) => {
              console.log("Json error from API");
              console.log(jsonError);
              setError(jsonError.message);
            })
            .catch((genericError) => {
              console.log("Generic error from API");
              console.log(error.statusText);
              setError("Error");
            });
        } else {
          console.log("Fetch error");
          console.log(error);
        }
      });
  };

  const onOtpSubmit = () => {
    //console.log(value+" "+email);
    var requestOptions = {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({ otpId: otpId, otp: otp }),
    };
    fetch(process.env.REACT_APP_GAME_RECHARGE_CONFIRM, requestOptions)
      .then((response) => {
        console.log(response.status);
        if (!response.ok) return Promise.reject(response);
        return response.json();
      })
      .then((result) => {
        //console.log(result);
        //setOtpId(parseInt(result));
        //setEnableOtpbox(true);
        console.log(result);
        //result = JSON.parse(result);
        alert("successfully recharged with " + result.recharge);
        setError(
          "recharge of " +
            result.recharge +
            " added to " +
            result.user +
            " current balance is " +
            result.amount
        );
        setIsFormDisabled(false);
        setIsButtonDisabled(false);
      })
      .catch((error) => {
        if (typeof error.json === "function") {
          error
            .json()
            .then((jsonError) => {
              console.log("Json error from API");
              console.log(jsonError);
              setError(jsonError.message);
            })
            .catch((genericError) => {
              console.log("Generic error from API");
              console.log(error.statusText);
              setError("Error");
            });
        } else {
          console.log("Fetch error");
          console.log(error);
        }
        setEnableOtpbox(true);
        setIsFormDisabled(true);
        setIsButtonDisabled(true);
      });
  };

  const amount = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
  if (!isAdmin || !isAuthorized) {
    return (
      <>
        <CNavbar></CNavbar>
        <h1>You are not authorized user!!</h1>
      </>
    );
  }

  return (
    <>
      <CNavbar></CNavbar>
      <div className="rechargebox">
        <div className="rechargeelement">
          <label>Email </label>
          <input onChange={(e) => setEmail(e.target.value)} type="text"></input>
        </div>
        <div className="rechargeelement">
          <label className="rechargelabel">Amount </label>
          <select onChange={(e) => setValue(e.target.value)}>
            {amount.map((i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
        </div>
        <div className="rechargeelement">
          <button onClick={() => onSubmit()}> Submit</button>
        </div>
        <div className="rechargeelement">
          <label>OTP </label>
          <input onChange={(e) => setOtp(e.target.value)} type="text"></input>
        </div>
        <div className="rechargeelement">
          <button onClick={() => onOtpSubmit()}>Validate</button>
        </div>
      </div>
    </>
  );
};

export default Recharge;
