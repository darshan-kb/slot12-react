import { useEffect, useState } from "react";
const Countdown = () => {

    const [count, setCount] = useState("0:0");
    useEffect(()=>{
        let sse = new EventSource("http://localhost:8081/sse");
        sse.onmessage = (response) => {
            let resp = JSON.parse(response.data);
            let div = document.getElementById("countdowndiv");          
            if(resp.payloadName==="count"){
                let res = parseInt(resp.payloadValue);
                if(res>=0){
                    console.log(res);
                    let countdown = parseInt(res/60)+":"+res%60;
                    setCount(countdown);
                }
            } 
        }
    })


    return <>
    <div className="countdowndiv">
        <div className="countdowntext">
            {count}
        </div>
    </div>
    </>
}

export default Countdown;