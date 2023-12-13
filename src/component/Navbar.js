import { React, useEffect, useState } from 'react';
import {demo} from "../links/demo"
import '../css/navbar.css'
const Navbar = ({balance, theme, headingflag}) => {

    let [flag, setFlag] = useState(sessionStorage.getItem('id_token') ==null ? false : true);
    const [demoStr, setDemoStr] = useState('');
    const token = sessionStorage.getItem('id_token');
       //console.log(token);
        const headers = new Headers();
        headers.set('Content-type','plain/text');
        headers.set('Authorization', `Bearer ${token}`);
        useEffect(() => {
            const url = demo();
            console.log(url);
            fetch(url,{
                method: 'GET',
                mode: 'cors',
                headers
            }).then(async (demoData) => {
                const demo = await demoData.text();
                //console.log(demo);
                setDemoStr(demo);
            }).catch((err)=>{
                console.log(err);
            });
        },[]);
    
    const logout = () =>{
        sessionStorage.clear();
        sessionStorage.removeItem('id_token')
        window.location.href = "/";
        setFlag(false);
    }

    return (
      <div className='slotnavbar'>
        <div className='heading'>
          {headingflag && <h3> Slotmachine Game</h3>}
        </div>
        <div className='navtoolbar'>
        
        <div className='userlabel'>
          {demoStr}
        </div>
        <div className='links'>
          <a style={{color:theme}} href="/" >Home</a>
        </div>
        <div className='links'>
            {
              flag===false && <div style={{float:"left"}}><a style={{color:theme}} href="/login" onClick={() => setFlag(true)}>Login</a></div>
            }
        </div>
        <div className='links'>
             {
                 flag===true && <div style={{float:"left", }}><a style={{color:theme}} href="/slotmachine">Game </a></div>
             }
        </div>
        <div className='links'>
             {
              flag===true && <div style={{float:"left", marginLeft:"16px", color:theme, fontWeight:"bold"}}>Balance : {balance}</div>
             }
        </div>
        <div className='logoutbutton'>
          {
            flag===true && <div style={{float:"left", marginLeft:"16px"}}><button onClick={logout}>Logout</button></div>
          }
        </div>
        </div>
      </div>
        
      );
    
  }
   
  export default Navbar;