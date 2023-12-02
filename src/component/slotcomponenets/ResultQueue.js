import { useEffect, useState } from "react";
import "../../css/queue.css";


const QueueBox = ({slot1, slot2}) => {
    let betSymbol = ['🍗','🍎','🍌','🍊','🍋','🍒','🍆','🍉','🧅','🥦','🍄','🥕'];
    let betMultiple = ['N', 'X2', 'X3']
    return <>
        <div className="qbox">
            <div className="qemoji">
                {betSymbol[slot1-1]}
            </div>
            <div className="qNumbers">
                <div className="qno">
                    {slot1}
                </div>
                <div className="qmultiple">
                    {betMultiple[slot2-1]}
                </div>
            </div>
        </div>
    </>
}

const ResultQueue = () =>{
    const[queueList, setQueueList] = useState(Array(5).fill([0,0]));
    const[loading, setLoading] = useState(false);
    const iteratorArr = [4,3,2,1,0];
    useEffect(()=>{
        console.log("Here");
        let sse = new EventSource(process.env.REACT_APP_SSE_QUEUE_URL);
        sse.onmessage = (response) => {
            let list = JSON.parse(response.data);
            //console.log(list[0][0]);
            setLoading(true);
            console.log(list);
            setQueueList(list);  
        }
    },[])
    // iteratorArr.map((i)=>{
    //     console.log(i);
    // })
    

    return <>
    <div className="queuecontainer">
        {
            loading && 
            <div className="queuebox">
            {
                            iteratorArr.map((i)=>{
                                return (
                                    <QueueBox key={i+"q"} slot1={queueList[i][0]} slot2={queueList[i][1]}></QueueBox>
                                );
                            })
            }
            </div>
        }
        
    </div>
    </>
}
export default ResultQueue;