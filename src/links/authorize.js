

const authorize =() =>{
    const codeChallenge = sessionStorage.getItem('codeChallenge');
    return `http://localhost:8080/oauth2/authorize?response_type=code&client_id=slotclient&scope=openid&redirect_uri=http://localhost:3006/authorized&code_challenge=${codeChallenge}&code_challenge_method=S256`;
}

export {authorize};