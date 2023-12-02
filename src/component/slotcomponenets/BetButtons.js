import { useCallback, useEffect, useState } from "react";
import "../../css/betbuttons.css";
import ResultQueue from "./ResultQueue";


const BetButton = ({buttonClickEvent, betSymbol, index, amount, cancelButtonClickEvent}) => {
    return <>
        <div className="buttonandlabel">
            <div className="betbutton" onClick={buttonClickEvent}>
                <div className="betCharacter">
                    {betSymbol}
                </div>
                <div className="betNumber">
                    {index}
                </div>
            </div>
            <div className="betlabelandcancelbutton">
                <div className="betbuttonlabel">
                    {amount!==0.0 && amount}
                </div>
                <div className="cancelbutton" onClick={cancelButtonClickEvent}>

                </div>
            </div>
            
        </div>
        
    </>
}

const AddBetButton = ({addBets}) =>{
    return <>
    <div className="addbutton" onClick={addBets}>
        <div className="bottombuttontext">
            Add
        </div>
    </div>
    </>
}

const ClearButton = ({clearBets}) =>{
    return <>
    <div className="clearbutton" onClick={clearBets}>
        <div className="bottombuttontext" onClick={clearBets}>
            Clear
        </div>
    </div>
    </>
}

const BetButtons = () => {
    let layerButtons = [1,2,3,4];
    let betSymbol = ['🍗','🍎','🍌','🍊','🍋','🍒','🍆','🍉','🧅','🥦','🍄','🥕'];
    let betAmounts = [5,10,20,50,100,500,1000];
    const [betArr, setBetArr] = useState(Array(12).fill(0));
    const [betIndexArr, setBetIndexArr] = useState(Array(12).fill(-1));


    const buttonClickEvent = (index, betArr, betIndexArr) => {
        let tempArr = betArr.slice();
        let tempBetIndex = betIndexArr.slice();
        tempBetIndex[index] = (betIndexArr[index]+1)%7;
        tempArr[index] = betAmounts[tempBetIndex[index]];
        setBetIndexArr(tempBetIndex);
        setBetArr(tempArr);
        console.log(tempArr);
    }

    const cancelButtonClickEvent = (index) => {
        let tempArr = betArr.slice();
        tempArr[index] = 0.0;
        setBetArr(tempArr);
    }

    const clearBets = () =>{
        let tempArr = Array(12).fill(0.0);
        let tempBetIndexArr = Array(12).fill(-1);
        setBetArr(tempArr);
        setBetIndexArr(tempBetIndexArr);
    }

    const addBets =()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({"bets":betArr}),
              };
              console.log("Added "+process.env.REACT_APP_TICKET_ADD_URL+" "+JSON.stringify({"bets":betArr}));
              //useEffect(()=>{
                fetch(process.env.REACT_APP_TICKET_ADD_URL, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    clearBets();
                })
                .catch(error => console.log('error', error));
    };


    return <>
        
        <div className="betbuttonboard">
            <div className="buttonlayer" id="layer1">
                <div className="buttonlayerbox" id="buttonlayer1">
                    {
                        layerButtons.map((i)=>{
                            return (
                                <BetButton buttonClickEvent={() => buttonClickEvent(i-1,betArr,betIndexArr)} key={i} betSymbol={betSymbol[i-1]} index={i} amount={betArr[i-1]} cancelButtonClickEvent={() => cancelButtonClickEvent(i-1)}></BetButton>
                            );
                        })
                    }
                </div>
            </div>
            <div className="buttonlayer" id="layer2">
            <div className="buttonlayerbox" id="buttonlayer2">
                    {
                        layerButtons.map((i)=>{
                            return (
                                <BetButton buttonClickEvent={() => buttonClickEvent(i+4-1,betArr,betIndexArr)} key={i+4} betSymbol={betSymbol[i+4-1]}  index={i+4} amount={betArr[i+4-1]} cancelButtonClickEvent={() => cancelButtonClickEvent(i+4-1)}></BetButton>
                            );
                        })
                    }
                </div>
            </div>
            <div className="buttonlayer" id="layer3">
            <div className="buttonlayerbox" id="buttonlayer3">
                    {
                        layerButtons.map((i)=>{
                            return (
                                <BetButton buttonClickEvent={() => buttonClickEvent(i+8-1,betArr,betIndexArr)} key={i+8} betSymbol={betSymbol[i+8-1]}  index={i+8} amount={betArr[i+8-1]} cancelButtonClickEvent={() => cancelButtonClickEvent(i+8-1)}></BetButton>
                            );
                        })
                    }
                </div>
            </div>
            <div className="bottombuttonlayer">
                    <div className="bottombuttons">
                        <AddBetButton addBets={()=>addBets()}></AddBetButton>
                        <ClearButton clearBets={() => clearBets()}></ClearButton>
                    </div>
            </div>
        </div>
            
    </>
}

export default BetButtons;