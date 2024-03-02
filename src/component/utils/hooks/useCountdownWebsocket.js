import { useState, useEffect } from "react";
import { SPIN_WEBSOCKET_URL, SPIN_WEBSOCKET_COUNTDOWN_URL } from "../Url";
import { over } from "stompjs";
import SockJS from "sockjs-client";

const useCountdownWebSocket = () => {
  const [count, setCount] = useState("0:0");

  useEffect(() => {
    var stompClient = null;
    const onConnected = (frame) => {
      console.log("connected to ws --" + frame);
      try {
        stompClient.subscribe(SPIN_WEBSOCKET_COUNTDOWN_URL, onCountReceived);
      } catch (err) {
        console.log("Hereee");
      }
    };

    const onError = () => {
      console.log("WS error");
    };

    let sock = new SockJS(SPIN_WEBSOCKET_URL);
    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);

    const onCountReceived = (payload) => {
      const servercount = parseInt(payload.body);
      if (servercount >= 0) {
        let countdown = parseInt(servercount / 60) + ":" + (servercount % 60);
        setCount(countdown);
      }
    };
    return () => {
      stompClient.disconnect();
    };
  }, []);

  return count;
};

export default useCountdownWebSocket;
