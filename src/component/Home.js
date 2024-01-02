import { useEffect, useState } from "react";
import {demo} from "../links/demo"
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
const Home =() =>{
    const [balance, setBalance] = new useState(0);
    const token = sessionStorage.getItem('id_token');
    if(token!==null)
    {const decodedToken = jwtDecode(token);
    console.log(decodedToken);}
    //console.log(token);
        const headers = new Headers();
        //headers.set('Content-type','plain/text');
        headers.set('Authorization', `Bearer ${token}`);
        //headers.set("Authorization","Bearer eyJraWQiOiI5MjlmZmI1Mi00YWJhLTQ0MWItOTUwYi04YTg1Y2Q2YzRjM2IiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkYXJzaGFuYmVoZXJlQGdtYWlsLmNvbSIsImF1ZCI6InNsb3RjbGllbnQiLCJ0ZXN0IjoibmV3IGNsYWltIGFkZGVkIiwiYXpwIjoic2xvdGNsaWVudCIsImlzcyI6Imh0dHA6Ly8xOTIuMTY4LjEuMTM6ODA4MCIsImV4cCI6MTcwNDA3NzQ5MCwiaWF0IjoxNzA0MDc1NjkwLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIl19.cL-zVWTNCjHCXZnMJ5LKYDugrW4rws0xdDaM4u--47wGkBdGwV83NhmKeVLRsvQTS5bF19WH4Bky1a7EziEeet9b6cYJIiaNW5qU0ZHJVuyS6w1pFwwlpSQdUbUHv7UxpaZwFkJh34eGYmnLO82S1QQH5Fa0Kx545GJfah_u19kzaY1EDB-dMY53oClEkQjEYKab8T3I9xcq-VWMLZCnH6msLB7P_dm_926I6-h6nM2K3kBFl3KYptAJlND4BEZaTAWggBmLmpwcestKBYXL9V3yDqBCCB7yf-Lo_NKMtWq7IuX6hSKQ44auqShSwuOR5V1_u9SVouuA9dGATcrCfw");
    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            headers: headers
          };
        fetch(process.env.REACT_APP_ACCOUNT_BALANCE, requestOptions)
            .then(response => response.text())
            .then(result => setBalance(JSON.parse(result)))
            .catch(error => console.log('error', error));
    },[])
    return <>
    <Navbar balance={balance} theme={"black"} headingflag={true}/>
    {/* <div>
        <h1>Home</h1>
    </div> */}
    </>
}

export default Home;