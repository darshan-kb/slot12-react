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
const Slotmachine = () =>{
    const [count, setCount] = useState("0:0");
    const[queueList, setQueueList] = useState(Array(5).fill([0,0]));
    const[queueLoading, setQueueLoading] = useState(false);
    var stompClient =null;
    useEffect(()=>{
        const onConnected = () => {
            //console.log("connected to ws");
            // setUserData({...userData,"connected": true});
            stompClient.subscribe('/countdown/count', onCountReceived);
            stompClient.subscribe('/queue/data', onQueueReceived);
            // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
            // userJoin();
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
        }
        const onQueueReceived = (payload) => {
            //console.log(payload.body);
            const queue = JSON.parse(payload.body);
            setQueueLoading(true);
            //console.log(queue);
            setQueueList(queue); 
        }
    
        
    },[])



    return <>
        <div className="container">
            <div className="slotsection">
                <SlotHeading></SlotHeading>
                <Countdown count={count}></Countdown>
                <Slot></Slot>
            </div>
            <div className="rightsection">
                <ResultQueue queueList={queueList} loading={queueLoading}></ResultQueue>
                <BetButtons></BetButtons>
            </div>
        </div>
        
        {/* <BetButton></BetButton> */}
        
    </>
}

export default Slotmachine;