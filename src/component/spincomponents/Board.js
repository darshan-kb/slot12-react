import { useState, useEffect } from "react";
// import {demo} from "../links/demo";
import "../../css/spinbuttonboard.css";
import { SPIN_BET_ADD_URL } from "../utils/Url";

function Wlttb({ top, left, length, chipButton, rowNo }) {
  let ttbbetblockA = [];
  for (let i = 0; i < length; i++) ttbbetblockA[i] = rowNo * 12 + i;
  return (
    <div
      style={{
        width: "600px",
        height: "10px",
        marginTop: top,
        position: "absolute",
      }}
      onClick={chipButton}
    >
      {ttbbetblockA.map((i) => {
        return (
          <Ttbbetblock key={i} left={left[i] + "px"} top={top}></Ttbbetblock>
        );
      })}
    </div>
  );
}

function Ttbbetblock({ left, singleNum, currentChip, BoardButtonF }) {
  return (
    <div
      className="Ttbbetblock"
      style={{
        marginLeft: left,
      }}
      onClick={BoardButtonF}
    >
      <SingleButton
        singleNum={singleNum}
        currentChip={currentChip}
        num={singleNum}
        singleButton={BoardButtonF}
        l={"-3px"}
        t={"-3px"}
      ></SingleButton>
    </div>
  );
}

function Wlrtl({ left, verticalSplitButton }) {
  let wlrtlA = [];
  for (let i = 0; i < 11; i++) {
    wlrtlA[i] = i;
  }
  return wlrtlA.map((i) => {
    return (
      <div
        style={{
          width: "16px",
          height: "270px",
          marginLeft: left[i] + "px",
          float: "left",
          position: "absolute",
        }}
      >
        <Rtlbb key={"rtlbb1" + i + "#"} top={"40px"}></Rtlbb>
        <Rtlbb key={"rtlbb2" + i + "#"} top={"80px"}></Rtlbb>
        <Rtlbb key={"rtlbb3" + i + "#"} top={"80px"}></Rtlbb>
      </div>
    );
  });
}

function Rtlbb({ top, singleNum, currentChip, BoardButtonF, id, selector }) {
  //console.log(id+"Here");
  return (
    <div
      className="Rtlbb"
      id={selector}
      style={{
        marginTop: top,
      }}
      onClick={BoardButtonF}
    >
      <SingleButton
        singleNum={singleNum}
        currentChip={currentChip}
        num={singleNum}
        singleButton={BoardButtonF}
        l={"-5px"}
        t={"-5px"}
      ></SingleButton>
    </div>
  );
}

function Wlcb({ top, left, length, chipButton }) {
  let ttbbetblockA = [];
  for (let i = 0; i < length; i++) ttbbetblockA[i] = i;
  return (
    <>
      {ttbbetblockA.map((i) => {
        return <Wlcbblock key={i} left={left[i] + "px"} top={top}></Wlcbblock>;
      })}
    </>
  );
}

function Wlcbblock({
  left,
  top,
  singleNum,
  currentChip,
  BoardButtonF,
  selector,
}) {
  //left=left+"px";
  //console.log(left+" Here 2");
  //console.log(top + "hhhh");
  return (
    <div
      className="Wlcbblock"
      style={{
        marginLeft: left,
        marginTop: top,
      }}
      id={selector}
      onClick={BoardButtonF}
    >
      <SingleButton
        singleNum={singleNum}
        currentChip={currentChip}
        num={singleNum}
        singleButton={BoardButtonF}
        l={"-4px"}
        t={"-3px"}
      ></SingleButton>
    </div>
  );
}

function NumberBoard({ row }) {
  const redSet = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 23, 25, 27, 30, 32, 34, 36,
  ]);
  const [singleNum, setSingleNum] = useState(Array(13).fill(-1));

  function singleButton(i) {
    //console.log("single-button-clicked "+i);
    let tempSingle = singleNum.slice();
    tempSingle[i] = 0;
    tempSingle[i] = 50;
    setSingleNum(tempSingle);
  }

  return (
    <div className="number_box">
      {row.map((i) => {
        if (i < 0) return <Tt1Block key={i} num={i}></Tt1Block>;
        if (redSet.has(i)) {
          return (
            <Number
              key={i}
              num={i}
              color={"red"}
              singleNum={singleNum[i]}
              singleButton={() => singleButton(i)}
            ></Number>
          );
        } else {
          return (
            <Number
              key={i}
              num={i}
              color={"black"}
              singleNum={singleNum[i]}
              singleButton={() => singleButton(i)}
            ></Number>
          );
        }
      })}
    </div>
  );
}

function Number({ color, num, singleNum, singleButton, currentChip }) {
  //console.log(singleNum+" "+num);
  return (
    <div
      className="number"
      style={{
        backgroundColor: color,
        boxShadow: "inset 0 0 0 1px white",
      }}
    >
      <SingleButton
        singleNum={singleNum}
        currentChip={currentChip}
        num={num}
        singleButton={singleButton}
        l={"8px"}
        t={"20px"}
      ></SingleButton>
      <div className="digits" onClick={singleButton}>
        {num}
      </div>
    </div>
  );
}

function SingleButton({ num, singleNum, currentChip, singleButton, l, t }) {
  //console.log(singleNum + "here");
  return (
    <>
      {singleNum > 0 && (
        <div
          className="single_button"
          id={num + "chipRing"}
          style={{
            marginTop: t,
            marginLeft: l,
            border: "2px solid " + currentChip,
          }}
          onClick={singleButton}
        >
          <div style={{ marginLeft: "2px" }}>{singleNum}</div>
        </div>
      )}
    </>
  );
}

function Bbtop({
  singleNum,
  currentChip,
  BoardButtonF,
  singleNum1,
  currentChip1,
  BoardButtonF1,
}) {
  return (
    <>
      <div className="Bbtop">
        <div className="top_button">
          <SingleButton
            singleNum={singleNum}
            currentChip={currentChip}
            num={singleNum}
            singleButton={BoardButtonF}
            l={"135px"}
            t={"5px"}
          ></SingleButton>
          <div className="half_digit" onClick={BoardButtonF}>
            1 to 18
          </div>
        </div>
        <div className="top_button">
          <SingleButton
            singleNum={singleNum1}
            currentChip={currentChip1}
            num={singleNum1}
            singleButton={BoardButtonF1}
            l={"135px"}
            t={"5px"}
          ></SingleButton>
          <div className="half_digit" onClick={BoardButtonF1}>
            19 to 36
          </div>
        </div>
      </div>
    </>
  );
}

function Tt1Block({ num, rowB, singleNum, currentChip }) {
  return (
    <div className="button_2to1">
      <SingleButton
        singleNum={singleNum}
        currentChip={currentChip}
        num={num}
        singleButton={rowB}
        l={"10px"}
        t={"25px"}
      ></SingleButton>
      <div className="button_2to1_label" onClick={rowB}>
        2 to 1
      </div>
    </div>
  );
}

function Dozen({
  singleNum,
  currentChip,
  BoardButtonF,
  singleNum1,
  currentChip1,
  BoardButtonF1,
  singleNum2,
  currentChip2,
  BoardButtonF2,
}) {
  return (
    <div className="dozen_box">
      <div className="dozen">
        <SingleButton
          singleNum={singleNum}
          currentChip={currentChip}
          num={singleNum}
          singleButton={BoardButtonF}
          l={"85px"}
          t={"5px"}
        ></SingleButton>
        <div className="dozen_label" onClick={BoardButtonF}>
          1 to 12
        </div>
      </div>
      <div className="dozen">
        <SingleButton
          singleNum={singleNum1}
          currentChip={currentChip1}
          num={singleNum1}
          singleButton={BoardButtonF1}
          l={"85px"}
          t={"5px"}
        ></SingleButton>
        <div className="dozen_label" onClick={BoardButtonF1}>
          13 to 24
        </div>
      </div>
      <div className="dozen">
        <SingleButton
          singleNum={singleNum2}
          currentChip={currentChip2}
          num={singleNum2}
          singleButton={BoardButtonF2}
          l={"85px"}
          t={"5px"}
        ></SingleButton>
        <div className="dozen_label" onClick={BoardButtonF2}>
          25 to 36
        </div>
      </div>
    </div>
  );
}

function OtoBoard({
  singleNum,
  currentChip,
  BoardButtonF,
  singleNum1,
  currentChip1,
  BoardButtonF1,
  singleNum2,
  currentChip2,
  BoardButtonF2,
  singleNum3,
  currentChip3,
  BoardButtonF3,
}) {
  return (
    <div className="bottom_box">
      <div className="bottom">
        <SingleButton
          singleNum={singleNum}
          currentChip={currentChip}
          num={singleNum}
          singleButton={BoardButtonF}
          l={"60px"}
          t={"5px"}
        ></SingleButton>
        <div className="bottom_label" onClick={BoardButtonF}>
          Even
        </div>
      </div>
      <div className="bottom">
        <SingleButton
          singleNum={singleNum1}
          currentChip={currentChip1}
          num={singleNum1}
          singleButton={BoardButtonF1}
          l={"60px"}
          t={"5px"}
        ></SingleButton>
        <div className="bottom_label" onClick={BoardButtonF1}>
          Red
        </div>
      </div>
      <div className="bottom">
        <SingleButton
          singleNum={singleNum2}
          currentChip={currentChip2}
          num={singleNum2}
          singleButton={BoardButtonF2}
          l={"60px"}
          t={"5px"}
        ></SingleButton>
        <div className="bottom_label" onClick={BoardButtonF2}>
          Black
        </div>
      </div>
      <div className="bottom">
        <SingleButton
          singleNum={singleNum3}
          currentChip={currentChip3}
          num={singleNum3}
          singleButton={BoardButtonF3}
          l={"60px"}
          t={"5px"}
        ></SingleButton>
        <div className="bottom_label" onClick={BoardButtonF3}>
          Odd
        </div>
      </div>
    </div>
  );
}

function Number0({ singleNum, currentChip, BoardButtonF }) {
  return (
    <div className="number_0">
      <SingleButton
        singleNum={singleNum}
        currentChip={currentChip}
        num={singleNum}
        singleButton={BoardButtonF}
        l={"5px"}
        t={"50px"}
      ></SingleButton>
      <div className="digit_0" onClick={BoardButtonF}>
        0
      </div>
    </div>
  );
}
function ChipDeck({ value, chipSelect, colour, selectedchipState }) {
  return (
    <>
      {selectedchipState === 0 && (
        <div
          className="chipdeck"
          style={{
            boxShadow: "inset 0 0 0 3px " + colour,
            border: "1px solid " + colour,
            borderColor: colour,
          }}
          onClick={chipSelect}
        >
          <div
            className="selected_chip_label"
            // style={{ marginTop: "8px", marginLeft: "8px" }}
          >
            {value}
          </div>
        </div>
      )}
      {selectedchipState === 1 && (
        <div
          className="selected_chip"
          style={{
            boxShadow: "inset 0 0 0 3px " + colour,
            border: "2px solid " + colour,
            borderColor: colour,
          }}
          onClick={chipSelect}
        >
          <div
            className="selected_chip_label"
            // style={{ marginTop: "12px", marginLeft: "5px" }}
          >
            {value}
          </div>
        </div>
      )}
    </>
  );
}

const Board = ({ updateBalance }) => {
  let ttbbetblockA = [];
  let wlrtlA = [];
  for (let i = 0; i < 12; i++) ttbbetblockA[i] = i;

  for (let i = 0; i < 11; i++) {
    wlrtlA[i] = i;
  }

  let WlttbTopA = [42, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34];
  let WlttbA = [10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
  let WlcbA = [56, 86, 116, 146, 176, 206, 236, 266, 296, 326, 356, 386];
  const row3 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, -1];
  const row2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, -2];
  const row1 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, -3];
  const redSet = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 23, 25, 27, 30, 32, 34, 36,
  ]);

  const [seletedchipState, setSelectedChipState] = useState(Array(4).fill(0));

  const [boardMap, setBoardMap] = useState([
    Array(37).fill(0),
    Array(24).fill(0),
    Array(3).fill(0),
    Array(33).fill(0),
    Array(22).fill(0),
    [0],
    Array(2).fill(0),
    Array(3).fill(0),
    Array(4).fill(0),
    Array(12).fill(0),
  ]);
  const [ringMap, setRingMap] = useState([
    Array(37).fill(""),
    Array(24).fill(""),
    Array(3).fill(""),
    Array(33).fill(""),
    Array(22).fill(""),
    [""],
    Array(2).fill(""),
    Array(3).fill(""),
    Array(4).fill(""),
    Array(12).fill(""),
  ]);
  const [chipValue, setChipValue] = useState(0);

  function ringColorMap() {
    if (chipValue === 1) {
      return "orange";
    } else if (chipValue === 5) {
      return "yellow";
    } else if (chipValue === 10) {
      return "purple";
    } else {
      return "blue";
    }
  }

  function BoardButtonF(i, cat) {
    if (chipValue === 0) {
      alert("Please select chip");
      return;
    }

    let tempChipColor = ringMap.slice();
    tempChipColor[cat][i] = ringColorMap();
    setRingMap(tempChipColor);

    let tempSingle = boardMap.slice();
    tempSingle[cat][i] += chipValue;
    setBoardMap(tempSingle);
  }

  function chipSelect(num, index) {
    setChipValue(num);
    let tempstatearr = seletedchipState.slice();
    for (let i = 0; i < tempstatearr.length; i++) {
      if (i === index) {
        tempstatearr[i] = 1;
      } else {
        tempstatearr[i] = 0;
      }
    }
    setSelectedChipState(tempstatearr);
  }

  function clear() {
    setBoardMap([
      Array(37).fill(0),
      Array(24).fill(0),
      Array(3).fill(0),
      Array(33).fill(0),
      Array(22).fill(0),
      [0],
      Array(2).fill(0),
      Array(3).fill(0),
      Array(4).fill(0),
      Array(12).fill(0),
    ]);
    setRingMap([
      Array(37).fill(""),
      Array(24).fill(""),
      Array(3).fill(""),
      Array(33).fill(""),
      Array(22).fill(""),
      [""],
      Array(2).fill(""),
      Array(3).fill(""),
      Array(4).fill(""),
      Array(12).fill(""),
    ]);
  }

  function Add() {
    //console.log(headers);
    let token = sessionStorage.getItem("id_token");
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);
    //console.log(token);
    var requestOptions = {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify(boardMap),
    };
    fetch(SPIN_BET_ADD_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        let res = JSON.parse(result);
        updateBalance(res.payloadValue);

        clear();
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <div key={"betting_board"} id="betting_board" className="betting_board">
        <div key={"betting_board1"} className="winning_lines">
          {/* <Wlttb key={"wlttbtop"} top={"0px"} left={WlttbTopA} length={11} BoardButtonF={() => BoardButtonF()}></Wlttb> */}

          <div key={"betting_board2"} className="betting_board2">
            {ttbbetblockA.map((i) => {
              return (
                <Ttbbetblock
                  key={i + "split"}
                  left={WlttbA[i] + "px"}
                  top={"85px"}
                  singleNum={boardMap[1][i]}
                  BoardButtonF={() => BoardButtonF(i, 1)}
                  currentChip={ringMap[1][i]}
                ></Ttbbetblock>
              );
            })}
          </div>
          <div key={"betting_board3"} className="betting_board3">
            {ttbbetblockA.map((i) => {
              i = i + 12;
              return (
                <Ttbbetblock
                  key={i + "split"}
                  left={WlttbA[i - 12] + "px"}
                  top={"175px"}
                  singleNum={boardMap[1][i]}
                  BoardButtonF={() => BoardButtonF(i, 1)}
                  currentChip={ringMap[1][i]}
                ></Ttbbetblock>
              );
            })}
          </div>
          <div key={"betting_board4"} className="betting_board4">
            {ttbbetblockA.map((i) => {
              //i=i+24;

              return (
                <Ttbbetblock
                  key={i + "column"}
                  left={WlttbA[i] + "px"}
                  top={"265px"}
                  singleNum={boardMap[9][i]}
                  BoardButtonF={() => BoardButtonF(i, 9)}
                  currentChip={ringMap[9][i]}
                ></Ttbbetblock>
              );
            })}
          </div>

          {wlrtlA.map((i) => {
            return (
              <div
                key={"betting_board5" + i}
                className={"betting_board5"}
                id={"betting_board5_" + i}
                style={{ marginLeft: WlcbA[i] + 10 + "px" }}
              >
                <Rtlbb
                  key={"rtlbb1" + i}
                  id={i}
                  selector={"rtlbb1"}
                  top={"20px"}
                  singleNum={boardMap[3][i]}
                  BoardButtonF={() => BoardButtonF(i, 3)}
                  currentChip={ringMap[3][i]}
                ></Rtlbb>
                <Rtlbb
                  key={"rtlbb2" + (i + 11)}
                  id={i + 11}
                  selector={"rtlbb2"}
                  top={"40px"}
                  singleNum={boardMap[3][i + 11]}
                  BoardButtonF={() => BoardButtonF(i + 11, 3)}
                  currentChip={ringMap[3][i + 11]}
                ></Rtlbb>
                <Rtlbb
                  key={"rtlbb3" + (i + 22)}
                  id={i + 22}
                  selector={"rtlbb2"}
                  top={"40px"}
                  singleNum={boardMap[3][i + 22]}
                  BoardButtonF={() => BoardButtonF(i + 22, 3)}
                  currentChip={ringMap[3][i + 22]}
                ></Rtlbb>
              </div>
            );
          })}

          {wlrtlA.map((i) => {
            return (
              <Wlcbblock
                key={i + "corner"}
                left={WlcbA[i] + 10 + "px"}
                top={"75px"}
                selector={"corner_" + i}
                singleNum={boardMap[4][i]}
                BoardButtonF={() => BoardButtonF(i, 4)}
                currentChip={ringMap[4][i]}
              ></Wlcbblock>
            );
          })}
          {wlrtlA.map((i) => {
            i += 11;
            return (
              <Wlcbblock
                key={i + "corner"}
                left={WlcbA[i - 11] + "px"}
                top={"125px"}
                selector={"corner_" + i}
                singleNum={boardMap[4][i]}
                BoardButtonF={() => BoardButtonF(i, 4)}
                currentChip={ringMap[4][i]}
              ></Wlcbblock>
            );
          })}

          {/* <Wlttb key={"wlttb1"} top={"85px"} left={WlttbA} rowNo={0} length={12} chipButton={() => chipAddButton()}></Wlttb>
                    <Wlttb key={"wlttb2"} top={"175px"} left={WlttbA} rowNo={1} length={12} chipButton={() => chipAddButton()}></Wlttb>
                    <Wlttb key={"wlttb3"} top={"265px"} left={WlttbA} rowNo={2} length={12} chipButton={() => chipAddButton()}></Wlttb> */}
          {/* <Wlrtl key={"wlrtl1"} left={WlcbA} verticalSplitButton={() => verticalSplitAddButton()}></Wlrtl> */}

          {/* <Wlcb key={"wlcb1"} top={"85px"} left={WlcbA} length={11} chipButton={() => chipAddButton()}></Wlcb>
                    <Wlcb key={"wlcb2"} top={"175px"} left={WlcbA} length={11} chipButton={() => chipAddButton()}></Wlcb> */}
        </div>

        <div key={"betting_board6"} className="betting_board6">
          <ChipDeck
            key={"chip1"}
            value={1}
            chipSelect={() => chipSelect(1, 0)}
            colour={"orange"}
            selectedchipState={seletedchipState[0]}
          ></ChipDeck>
          <ChipDeck
            key={"chip2"}
            value={5}
            chipSelect={() => chipSelect(5, 1)}
            colour={"yellow"}
            selectedchipState={seletedchipState[1]}
          ></ChipDeck>
          <ChipDeck
            key={"chip3"}
            value={10}
            chipSelect={() => chipSelect(10, 2)}
            colour={"purple"}
            selectedchipState={seletedchipState[2]}
          ></ChipDeck>
          <ChipDeck
            key={"chip4"}
            value={100}
            chipSelect={() => chipSelect(100, 3)}
            colour={"blue"}
            selectedchipState={seletedchipState[3]}
          ></ChipDeck>
        </div>

        <div key={"betting_board7"} className="betting_board7">
          <div style={{ width: "50%", height: "100%", float: "left" }}>
            <button
              style={{ marginTop: "10%", width: "60px", height: "30px" }}
              onClick={Add}
            >
              {" "}
              Add
            </button>
          </div>
          <div style={{ width: "50%", height: "100%", float: "left" }}>
            <button
              style={{ marginTop: "10%", width: "60px", height: "30px" }}
              onClick={clear}
            >
              {" "}
              Clear
            </button>
          </div>
        </div>

        <div key={"betting_board8"} className="number_board">
          <Number0
            key={"zero"}
            singleNum={boardMap[5][0]}
            BoardButtonF={() => BoardButtonF(0, 5)}
            currentChip={ringMap[5][0]}
          ></Number0>
          <Bbtop
            key={"btop"}
            singleNum={boardMap[6][0]}
            BoardButtonF={() => BoardButtonF(0, 6)}
            currentChip={ringMap[6][0]}
            singleNum1={boardMap[6][1]}
            BoardButtonF1={() => BoardButtonF(1, 6)}
            currentChip1={ringMap[6][1]}
          ></Bbtop>

          <div key={"betting_board9"} className="number_box">
            {row1.map((i) => {
              if (i < 0)
                return (
                  <Tt1Block
                    key={"allrow1"}
                    num={0}
                    singleNum={boardMap[2][0]}
                    rowB={() => BoardButtonF(0, 2)}
                    currentChip={ringMap[2][0]}
                  ></Tt1Block>
                );
              if (redSet.has(i)) {
                //console.log(i);
                return (
                  <Number
                    key={i + "single"}
                    num={i}
                    color={"red"}
                    singleNum={boardMap[0][i]}
                    singleButton={() => BoardButtonF(i, 0)}
                    currentChip={ringMap[0][i]}
                  ></Number>
                );
              } else {
                return (
                  <Number
                    key={i + "single"}
                    num={i}
                    color={"black"}
                    singleNum={boardMap[0][i]}
                    singleButton={() => BoardButtonF(i, 0)}
                    currentChip={ringMap[0][i]}
                  ></Number>
                );
              }
            })}
          </div>
          <div key={"betting_board10"} className="number_box">
            {row2.map((i) => {
              if (i < 0)
                return (
                  <Tt1Block
                    key={"allrow2"}
                    num={1}
                    singleNum={boardMap[2][1]}
                    rowB={() => BoardButtonF(1, 2)}
                    currentChip={ringMap[2][1]}
                  ></Tt1Block>
                );
              if (redSet.has(i)) {
                return (
                  <Number
                    key={i + "single"}
                    num={i}
                    color={"red"}
                    singleNum={boardMap[0][i]}
                    singleButton={() => BoardButtonF(i, 0)}
                    currentChip={ringMap[0][i]}
                  ></Number>
                );
              } else {
                return (
                  <Number
                    key={i + "single"}
                    num={i}
                    color={"black"}
                    singleNum={boardMap[0][i]}
                    singleButton={() => BoardButtonF(i, 0)}
                    currentChip={ringMap[0][i]}
                  ></Number>
                );
              }
            })}
          </div>
          <div key={"betting_board11"} className="number_box">
            {row3.map((i) => {
              if (i < 0)
                return (
                  <Tt1Block
                    key={"allrow3"}
                    num={2}
                    singleNum={boardMap[2][2]}
                    rowB={() => BoardButtonF(2, 2)}
                    currentChip={ringMap[2][2]}
                  ></Tt1Block>
                );
              if (redSet.has(i)) {
                return (
                  <Number
                    key={i + "single"}
                    num={i}
                    color={"red"}
                    singleNum={boardMap[0][i]}
                    singleButton={() => BoardButtonF(i, 0)}
                    currentChip={ringMap[0][i]}
                  ></Number>
                );
              } else {
                return (
                  <Number
                    key={i + "single"}
                    num={i}
                    color={"black"}
                    singleNum={boardMap[0][i]}
                    singleButton={() => BoardButtonF(i, 0)}
                    currentChip={ringMap[0][i]}
                  ></Number>
                );
              }
            })}
          </div>

          <Dozen
            key={"dozen"}
            singleNum={boardMap[7][0]}
            BoardButtonF={() => BoardButtonF(0, 7)}
            currentChip={ringMap[7][0]}
            singleNum1={boardMap[7][1]}
            BoardButtonF1={() => BoardButtonF(1, 7)}
            currentChip1={ringMap[7][1]}
            singleNum2={boardMap[7][2]}
            BoardButtonF2={() => BoardButtonF(2, 7)}
            currentChip2={ringMap[7][2]}
          ></Dozen>
          <OtoBoard
            key={"OtoBoard"}
            singleNum={boardMap[8][0]}
            BoardButtonF={() => BoardButtonF(0, 8)}
            currentChip={ringMap[8][0]}
            singleNum1={boardMap[8][1]}
            BoardButtonF1={() => BoardButtonF(1, 8)}
            currentChip1={ringMap[8][1]}
            singleNum2={boardMap[8][2]}
            BoardButtonF2={() => BoardButtonF(2, 8)}
            currentChip2={ringMap[8][2]}
            singleNum3={boardMap[8][3]}
            BoardButtonF3={() => BoardButtonF(3, 8)}
            currentChip3={ringMap[8][3]}
          ></OtoBoard>
        </div>
      </div>
    </>
  );
};

export default Board;
