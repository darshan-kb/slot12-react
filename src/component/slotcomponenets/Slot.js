
import "../../css/slot.css";
import Countdown from "./Countdown";
import SlotHeading from "./SlotHeading";
import { useEffect, useState } from "react";
let res1=[];
let res2=[];
let spincount=30;
const items = [
    '🍗',
    '🍎',
    '🍌',
    '🍊',
    '🍋',
    '🍒',
    '🍆',
    '🍉',
    '🧅',
    '🥦',
    '🍄',
    '🥕',
  ];
  const prizearr = ['N','X2','X3'];
 
 //init();
  //document.querySelector('#spinner').addEventListener('click', spin);
  //document.querySelector('#reseter').addEventListener('click', init);

  function init(firstInit = true, groups = 1, duration = 1) {
    let count=0;
    const doors = document.querySelectorAll('.door');
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
        return;
      }

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      const pool = ['❓'];
      if (!firstInit) {
        console.log("From spin");
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items);
        }
        let tmp=[];
        if(count==0){                 //First tile
          for(let i=0;i<12*20;i++){
            tmp[i] = items[res1[i%12]-1];
          }
        }
        else if(count==1){          //Second tile
          for(let i=0;i<12*20;i++){
            tmp[i] = res1[i%12];
          }
        }
        else{                       //Third tile
          for(let i=0;i<9*20;i++){
            tmp[i] = prizearr[res2[i%3]-1];
          }
        }

        pool.push(...tmp);
        count++;
        boxesClone.addEventListener(
          'transitionstart',
          function () {
            door.dataset.spinned = '1';
            this.querySelectorAll('.box').forEach((box) => {
              box.style.filter = 'blur(1px)';
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          'transitionend',
          function () {
            this.querySelectorAll('.box').forEach((box, index) => {
              box.style.filter = 'blur(0)';
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
    }
    
  }

  async function spin() {
    init(false, 1, spincount)
    const doors = document.querySelectorAll('.door');
    for (const door of doors) {
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }

  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }


const Slot = () => {
    init();
    useEffect(()=>{
      let sse = new EventSource("http://localhost:8081/sse");
      sse.onmessage = (response) => {
          let resp = JSON.parse(response.data);
          if(resp.payloadName==="count"){
            let res = parseInt(resp.payloadValue);
            //console.log("Here "+res);
            if(res===0){
              
            }
              //spinWheel(rouletteNumberMap.get(parseInt(resp.payloadValue)));
          }
          if(resp.payloadName==="result"){
            console.log(resp);
            res1 = resp.slot1;
            res2 = resp.slot2;
            init();
            spin();
          }
       }
  },[])
    
    return <>
    <div className="slotsection">
      <SlotHeading></SlotHeading>
      <Countdown></Countdown>
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
            {/* <button onClick={spin}>Spin</button>
            <button onClick={init}>Reset</button> */}
    </div>
    </>
}

export default Slot;