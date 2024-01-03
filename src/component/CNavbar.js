import { React, useEffect, useState } from 'react';
import {demo} from "../links/demo"
import '../css/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const CNavbar = ({balance, theme, headingflag, adminflag}) => {

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
                flag===true && <div style={{float:"left", color:theme}}><a style={{color:theme}} href="/claims">Claims </a></div>
            }
        </div>
        <div className='adminDiv'>
          {adminflag===true && <NavDropdown
              id="nav-dropdown-dark-example"
              title="Admin"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/home">Recharge</NavDropdown.Item>
              <NavDropdown.Item href="/home">User Details</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>}
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
   
  export default CNavbar;