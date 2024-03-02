import { useState, useEffect } from "react";
import { SPIN_WEBSOCKET_URL, SPIN_WEBSOCKET_RESULT_URL } from "../Url";
import { over } from "stompjs";
import SockJS from "sockjs-client";

const useSpinResultWebsocket = () => {
  const [spinResult, setSetResult] = useState(0);
  console.log("Heeereoe");
  useEffect(() => {
    var stompClient = null;
    const onConnected = (frame) => {
      console.log("connected to ws --" + frame);
      try {
        stompClient.subscribe(SPIN_WEBSOCKET_RESULT_URL, onResultReceived);
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

    const onResultReceived = (payload) => {
      console.log(payload.body);
      //spinWheel(rouletteNumberMap.get(parseInt(payload.body)));
      setSetResult(parseInt(payload.body));
    };
    return () => {
      stompClient.disconnect();
    };
  }, [spinResult]);
  return spinResult;
};

export default useSpinResultWebsocket;
