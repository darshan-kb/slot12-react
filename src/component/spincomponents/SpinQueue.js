import "../../css/spinqueue.css";
import useSpinQueueWebsocket from "../utils/hooks/useSpinQueueWebsocket";

const QueueBox = ({ result, timestamp, cardColor }) => {
  return (
    <>
      <div className="spinqbox" style={{ backgroundColor: cardColor }}>
        <div className="spinqtimestamp">{timestamp}</div>
        <div className="spinqnumber">{result}</div>
      </div>
    </>
  );
};

const SpinQueue = () => {
  const [queueList, queueLoading] = useSpinQueueWebsocket();
  const redSet = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 23, 25, 27, 30, 32, 34, 36,
  ]);
  const iteratorArr = [4, 3, 2, 1, 0];
  return (
    <>
      <div className="spinqueuecontainer">
        {queueLoading && (
          <div className="spinqueuebox">
            {iteratorArr.map((i) => {
              return (
                <QueueBox
                  key={i + "q"}
                  result={queueList[i].result}
                  cardColor={redSet.has(queueList[i].result) ? "red" : "black"}
                  timestamp={queueList[i].gameTimestamp}
                ></QueueBox>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default SpinQueue;
