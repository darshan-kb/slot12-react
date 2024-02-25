import { useState } from "react";
import { useEffect } from "react";
import Wheel from "./Wheel";
import styles from "../css/Wheel.module.css"
import Board from "./Board";
import Countdown from "./Countdown";
import Balance from "./Balance"
import Navbar from "./Navbar";
import ResultCard from "./ResultCard";




const Game = () =>{
    const [balance, setBalance] = new useState(0);
    const [card, setCard] = new useState(0);
    
    const token = sessionStorage.getItem('id_token');
    const headers = new Headers();
    headers.set('Content-type','application/json');
    headers.set('Authorization', `Bearer ${token}`);
    useEffect(()=>{
        var requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: headers
        };
        fetch("http://localhost:9090/account/balance", requestOptions)
            .then(response => response.text())
            .then(result => setBalance(JSON.parse(result)))
            .catch(error => console.log('error', error));
    },[])
    const updateBalance = (value) => {
        setBalance(value);
    };
    const updateCard = (value) => {
        console.log("Here")
        setCard(value);
    }


    return (
        
        <div className="game" style={{width:"100%", height:"100%", position:"absolute"}}>
            <Navbar balance={balance} theme={"white"}></Navbar>
            <div className="LeftSection" style={{display:"block", height:"50%", width:"100%"}}>
                <Countdown></Countdown>
                {/* <ResultCard card = {card}></ResultCard> */}
                <Wheel></Wheel>
            </div>
                <Board updateBalance={updateBalance}></Board>
        </div>
      );
}

export default Game;