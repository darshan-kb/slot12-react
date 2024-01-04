import BetButton from "./slotcomponenets/BetButton";
import Slot from "./slotcomponenets/Slot";
import BetButtons from "./slotcomponenets/BetButtons";
import Countdown from "./slotcomponenets/Countdown";
import SlotHeading from "./slotcomponenets/SlotHeading";
import ResultQueue from "./slotcomponenets/ResultQueue";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useEffect, useState } from "react";
import "../css/slot.css";
import "../css/betbuttons.css";
import CNavbar from "./CNavbar";
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

const Slotmachine = () =>{
    
    const [count, setCount] = useState("0:0");
    const[queueList, setQueueList] = useState(Array(5).fill([0,0]));
    const[queueLoading, setQueueLoading] = useState(false);
    const[lastResult, setLastResult] = useState(Array(3).fill(['','','']));
    var stompClient =null;
    const [balance, setBalance] = new useState(0);

    const token = sessionStorage.getItem('id_token');
    const headers = new Headers();
    headers.set('Content-type','plain/text');
    headers.set('Authorization', `Bearer ${token}`);

    useEffect(()=>{
      var requestOptions = {
          method: 'GET',
          mode: 'cors',
          headers: headers
        };
      fetch(process.env.REACT_APP_ACCOUNT_BALANCE, requestOptions)
          .then(response => response.text())
          .then(result => setBalance(JSON.parse(result)))
          .catch(error => console.log('error', error));
    },[])
    const updateBalance = (value) => {
      setBalance(value);
    }
    useEffect(()=>{
      var requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: headers
      };
    fetch(process.env.REACT_APP_GAME_LASTGAME, requestOptions)
        .then(response => response.text())
        .then(result => {
          result =JSON.parse(result);
          let tmpLastResult = lastResult.slice();
          tmpLastResult[0] = items[result.slot1-1];
          tmpLastResult[1] = result.slot1;
          tmpLastResult[2] = prizearr[result.slot2-1];
          console.log(tmpLastResult+"in fetch");
          setLastResult(tmpLastResult);
        })
        .catch(error => console.log('error', error));
    },[])
    useEffect(()=>{
        const onConnected = (frame) => {
            console.log("connected to ws --"+ frame);
            // setUserData({...userData,"connected": true});
            try{
            stompClient.subscribe('/countdown/count', onCountReceived);
            stompClient.subscribe('/queue/data', onQueueReceived);
            stompClient.subscribe('/result/data', onResultReceived);
            }
            catch(err){
                console.log("Hereee")
            }
            // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
            // userJoin();
            getQueueOnConnect();
            getResultIfSpinStart();
        }

        const getQueueOnConnect = () => {
          const token = sessionStorage.getItem('id_token');
          const headers = new Headers();
          headers.set('Content-type','plain/text');
          headers.set('Authorization', `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: headers
              };
                fetch(process.env.REACT_APP_QUEUE, requestOptions)
                .then(response => response.text())
                .then(result => {
                    let tempqueue = JSON.parse(result);
                    let tqueue = tempqueue.map(i => {
                      let time = i.gameTimestamp.split("T")[1].split(":");
                      return {
                        slot1 : i.slot1,
                        slot2 : i.slot2,
                        gameTimestamp : time[0]+":"+time[1]
                      };
                    })
                    setQueueLoading(true);
                    setQueueList(tqueue);
                })
                .catch(error => console.log('error', error));
        }
        const getResultIfSpinStart = () =>{
          const token = sessionStorage.getItem('id_token');
          const headers = new Headers();
          headers.set('Content-type','plain/text');
          headers.set('Authorization', `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: headers
              };
                fetch(process.env.REACT_APP_RESULT, requestOptions)
                .then(response => response.text())
                .then(result => {
                    let gameResult = JSON.parse(result);
                    if(gameResult.spin===true){
                        res1 = gameResult.slot1;
                        res2 = gameResult.slot2;
                        init();
                        spin();
                    }
                    
                })
                .catch(error => console.log('error', error));
        }
        const onError = () => {
            console.log("WS error");
        }

        let sock = new SockJS(process.env.REACT_APP_WS);
        stompClient=over(sock);
        stompClient.connect({},onConnected,onError);
        
        
        const onCountReceived = (payload) => {
            console.log(payload.body);
            const servercount = parseInt(payload.body);
            if(servercount>=0){
                let countdown = parseInt(servercount/60)+":"+servercount%60;
                setCount(countdown);
            }
            if(servercount<0 && servercount>=-30 && res1.length===0 && res2.length===0){

            }
        }
        const onQueueReceived = (payload) => {
            const queue = JSON.parse(payload.body);
            let tqueue = queue.map(i => {
              let time = i.gameTimestamp.split("T")[1].split(":");
              return {
                slot1 : i.slot1,
                slot2 : i.slot2,
                gameTimestamp : time[0]+":"+time[1]
              };
            })
            setQueueLoading(true);
            setQueueList(tqueue); 
        }

        const onResultReceived = (payload) =>{
            let resp = JSON.parse(payload.body);
            res1 = resp.slot1;
            res2 = resp.slot2;
            init();
            spin();
        }
    },[])



    return <>
        <div className="slotmachinecontainer">
        <CNavbar balance={balance} theme={"black"} headingflag={false}/>
            <div className="slotsection">
                <SlotHeading></SlotHeading>
                <Countdown count={count}></Countdown>
                <Slot lastResult={lastResult}></Slot>
            </div>
            <div className="rightsection">
                <ResultQueue queueList={queueList} loading={queueLoading}></ResultQueue>
                <BetButtons updateBalance={updateBalance} lastResult={lastResult}></BetButtons>
            </div>
        </div>
        
        {/* <BetButton></BetButton> */}
        
    </>
}

export default Slotmachine;