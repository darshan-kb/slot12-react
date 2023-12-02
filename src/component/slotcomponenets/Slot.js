
import "../../css/slot.css";
import Countdown from "./Countdown";
import SlotHeading from "./SlotHeading";
import { useEffect, useState } from "react";
// let res1=[];
// let res2=[];
// let spincount=30;
// const items = [
//     '🍗',
//     '🍎',
//     '🍌',
//     '🍊',
//     '🍋',
//     '🍒',
//     '🍆',
//     '🍉',
//     '🧅',
//     '🥦',
//     '🍄',
//     '🥕',
//   ];
//   const prizearr = ['N','X2','X3'];
 

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }


const Slot = () => {
    
    return <>
      <div className="slots">
        <div className="doors">
                  <div className="door">
                    <div className="boxes">
                      {/* <!-- <div class="box">?</div> --> */}
                    </div>
                  </div>
              
                  <div className="door">
                    <div className="boxes">
                      {/* <!-- <div class="box">?</div> --> */}
                    </div>
                  </div>
              
                  <div className="door">
                    <div className="boxes">
                      {/* <!-- <div class="box">?</div> --> */}
                    </div>
                  </div>
        </div>
      </div>
    </>
}

export default Slot;