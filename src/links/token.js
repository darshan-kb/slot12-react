const token = (codeVerifier,code) => {
    //const codeVerifier = sessionStorage.getItem('codeVerifier');
    //const code = sessionStorage.getItem('code');
    return `http://localhost:8080/oauth2/token?client_id=slotclient&redirect_uri=http://localhost:3006/authorized&grant_type=authorization_code&code=${code}&code_verifier=${codeVerifier}`
}

export default token;