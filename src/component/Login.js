import { React, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { generateCodeVerifier, generateCodeChallenge } from '../pkce/pkce';
import { useNavigate, useSearchParams } from "react-router-dom";
const Login = () => {
    const verifier = generateCodeVerifier();
    sessionStorage.setItem('codeVerifier', verifier);
    console.log("verifier "+verifier);
    const codeChallenge = generateCodeChallenge();
    sessionStorage.setItem('codeChallenge', codeChallenge);
    console.log("code challenge "+codeChallenge);
    const navigate = useNavigate();
    
    useEffect(()=>{
        navigate('/redirect');
    },[])
    
    return (
        <>
           
            
            {/* <Link to={'/redirect'}>Login</Link> */}
        </>
    );
}

export default Login;