import { useEffect, useState } from "react";
import "../../css/queue.css";


const QueueBox = ({slot1, slot2,timestamp}) => {
    let betSymbol = ['🍗','🍎','🍌','🍊','🍋','🍒','🍆','🍉','🧅','🥦','🍄','🥕'];
    let betMultiple = ['N', 'X2', 'X3'];
    //console.log(timestamp);
    return <>
        <div className="qbox">
            <div className="qboxtopsection">
                <div className="qtimestamp">
                    {timestamp}
                </div>
                <div className="qemoji">
                    {betSymbol[slot1-1]}
                </div>
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

const ResultQueue = ({queueList, loading}) =>{
    const iteratorArr = [4,3,2,1,0];
    return <>
    <div className="queuecontainer">
        {
            loading && 
            <div className="queuebox">
            {
                            iteratorArr.map((i)=>{
                                
                                return (
                                    <QueueBox key={i+"q"} slot1={queueList[i].slot1} slot2={queueList[i].slot2} timestamp={queueList[i].gameTimestamp}></QueueBox>
                                );
                            })
            }
            </div>
        }
        
    </div>
    </>
}
export default ResultQueue;