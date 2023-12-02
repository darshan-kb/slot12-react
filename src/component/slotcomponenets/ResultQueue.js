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