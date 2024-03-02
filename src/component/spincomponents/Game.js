import { useState } from "react";
import { useEffect, useContext } from "react";
import Wheel from "./Wheel";
import Board from "./Board";
import CNavbar from "../CNavbar";
import "../../css/spingame.css";
import "../../css/spinbuttonboard.css";
import useCountdownWebSocket from "../utils/hooks/useCountdownWebsocket";
import UserContext from "../utils/UserContext";
import SpinQueue from "./SpinQueue";
import useSpinQueue from "../utils/hooks/useSpinQueue";
import useSpinQueueWebsocket from "../utils/hooks/useSpinQueueWebsocket";
import SpinCountdown from "./SpinCountdown";

const Game = () => {
  const { setBalance } = useContext(UserContext);

  const updateBalance = (value) => {
    setBalance(value);
  };

  return (
    <div
      className="game"
      style={{ width: "100%", height: "400px", position: "absolute" }}
    >
      <CNavbar></CNavbar>
      <div className="spinleftsection">
        <div className="spincountdowndiv">
          <label className="spincountdownlabel">
            <SpinCountdown />
          </label>
        </div>
        <Wheel></Wheel>
      </div>
      <div className="spinrightsection">
        <SpinQueue></SpinQueue>
        <Board updateBalance={() => updateBalance}></Board>
      </div>
    </div>
  );
};

export default Game;
