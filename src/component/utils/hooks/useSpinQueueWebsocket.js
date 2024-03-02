import { useEffect, useState } from "react";
import { SPIN_QUEUE, SPIN_QUEUE_WEBSOCKET, SPIN_WEBSOCKET_URL } from "../Url";
import useSpinQueue from "./useSpinQueue";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import authHeader from "../authHeader";

const useSpinQueueWebsocket = () => {
  const [queueList, setQueueList] = useState(Array(5).fill([0, 0]));
  const [queueLoading, setQueueLoading] = useState(false);

  useEffect(() => {
    var stompClient = null;
    const onConnected = (frame) => {
      console.log("connected to ws --" + frame);
      try {
        stompClient.subscribe(SPIN_QUEUE_WEBSOCKET, onQueueReceived);
      } catch (err) {
        console.log("Hereee");
      }

      //   const [queueList, queueLoading] = useSpinQueue();
      //   setQueueList(queueList);
      //   setQueueLoading(queueLoading);
      getQueueOnConnect();
    };

    const getQueueOnConnect = () => {
      const headers = authHeader();
      var requestOptions = {
        method: "GET",
        headers: headers,
      };
      fetch(SPIN_QUEUE, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          let tempqueue = JSON.parse(result);
          let tqueue = tempqueue.map((i) => {
            let time = i.gameTimestamp.split("T")[1].split(":");
            return {
              result: i.result,
              gameTimestamp: time[0] + ":" + time[1],
            };
          });
          setQueueLoading(true);
          setQueueList(tqueue);
        })
        .catch((error) => console.log("error", error));
    };

    const onError = () => {
      console.log("WS error");
    };

    let sock = new SockJS(SPIN_WEBSOCKET_URL);
    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);

    const onQueueReceived = (payload) => {
      const queue = JSON.parse(payload.body);
      let tqueue = queue.map((i) => {
        let time = i.gameTimestamp.split("T")[1].split(":");
        return {
          result: i.result,
          gameTimestamp: time[0] + ":" + time[1],
        };
      });
      setQueueLoading(true);
      setQueueList(tqueue);
    };
    return () => {
      stompClient.disconnect();
    };
  }, []);

  return [queueList, queueLoading];
};
export default useSpinQueueWebsocket;
