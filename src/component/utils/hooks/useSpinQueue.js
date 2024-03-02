import { useEffect, useState } from "react";
import authHeader from "../authHeader";
import { SPIN_QUEUE } from "../Url";

const useSpinQueue = () => {
  const [queueList, setQueueList] = useState(Array(5).fill([0, 0]));
  const [queueLoading, setQueueLoading] = useState(false);
  useEffect(() => {
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
  }, []);

  return [queueList, queueLoading];
};

export default useSpinQueue;
