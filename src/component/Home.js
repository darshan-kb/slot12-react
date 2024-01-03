import { useEffect, useState } from "react";
import {demo} from "../links/demo"
import CNavbar from "./CNavbar";
import { jwtDecode } from "jwt-decode";
const Home =() =>{
    const [balance, setBalance] = new useState(0);
    const [adminFlag, setAdminFlag] = new useState(false);
    const token = sessionStorage.getItem('id_token');
    if(token!==null){
        const decodedToken = jwtDecode(token);
        //setAdminFlag(decodedToken.authorities.includes("ROLE_ADMIN")) 
    }
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${token}`);
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
    <CNavbar balance={balance} theme={"black"} headingflag={true} adminflag={true}/>
    {/* <div>
        <h1>Home</h1>
    </div> */}
    </>
}

export default Home;