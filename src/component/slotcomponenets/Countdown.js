import { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
const Countdown = ({count}) => {
    var stompClient =null;
    // const [count, setCount] = useState("0:0");
    // useEffect(()=>{
    //     let sse = new EventSource(process.env.REACT_APP_SSE_COUNTDOWN_URL);
    //     sse.onmessage = (response) => {
    //         let resp = JSON.parse(response.data);
    //         let div = document.getElementById("countdowndiv");  
    //             let res = parseInt(resp.payloadValue);
    //             if(res>=0){
    //                 let countdown = parseInt(res/60)+":"+res%60;
    //                 setCount(countdown);
    //             }
    //     }
    // },[])
    
    // useEffect(()=>{
    //     const onConnected = () => {
    //         //console.log("connected to ws");
    //         // setUserData({...userData,"connected": true});
    //         stompClient.subscribe('/countdown/count', onMessageReceived);
    //         // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
    //         // userJoin();
    //     }
    //     const onError = () => {
    //         console.log("WS error");
    //     }
    //     let sock = new SockJS(process.env.REACT_APP_WS);
    //     stompClient=over(sock);
    //     stompClient.connect({},onConnected,onError);
        
    //     const onMessageReceived = (payload) => {
    //         console.log(payload.body);
    //         const servercount = parseInt(payload.body);
    //         if(servercount>=0){
    //             let countdown = parseInt(servercount/60)+":"+servercount%60;
    //             setCount(countdown);
    //         }
    //     }
    
        
    // },[])
    

    

    return <>
    <div className="countdowndiv">
        <div className="countdowntext">
            {count}
        </div>
    </div>
    </>
}

export default Countdown;