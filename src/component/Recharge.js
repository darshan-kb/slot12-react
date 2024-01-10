import CNavbar from "./CNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/recharge.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
const Recharge = () =>{
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [enableOtpbox, setEnableOtpbox] = useState(false);
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [otpId, setOtpId] = useState(0);
    let token = sessionStorage.getItem('id_token');
    let headers = new Headers();
    headers.set('Content-type','application/json');
    headers.set('Authorization', `Bearer ${token}`);

      const onSubmit = () => {
        
        console.log(value+" "+email);
        var requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify({"email":email, "amount":value})
          };
        fetch(process.env.REACT_APP_GAME_RECHARGE, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                setOtpId(parseInt(result));
                setEnableOtpbox(true);
                setIsFormDisabled(true);
                setIsButtonDisabled(true);
                alert("Otp sent on registered Email")
            })
            .catch(error => console.log('error', error));
      };

      const onOtpSubmit = () => {
        //console.log(value+" "+email);
        var requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify({"otpId":otpId, "otp":otp})
          };
        fetch(process.env.REACT_APP_GAME_RECHARGE_CONFIRM, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                //setOtpId(parseInt(result));
                //setEnableOtpbox(true);
                setIsFormDisabled(false);
                setIsButtonDisabled(false);
            })
            .catch(error => console.log('error', error));
      }


    const amount = [5,10,20,50,100,200,500,1000,2000,5000,10000,20000];

    return (
        <>
        <CNavbar></CNavbar>
        <div className="rechargeform">
            <Form>
            <Form.Group key="email_group" className="mb-3" controlId="formBasicEmail">
                <Form.Label key="email">Email address</Form.Label>
                <Form.Control key="email_box" disabled={isFormDisabled} type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value )}/>
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>
            <Form.Label key="amount">Amount</Form.Label>
            <Form.Select key="value" disabled={isFormDisabled} value={value} onChange={(e) => setValue(e.target.value)}>
                    {amount.map((i)=>{
                        return <option key={i} value={i}>{i}</option>
                    })}
            </Form.Select>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            
            <Button disabled={isButtonDisabled} variant="primary" onClick={onSubmit}>
                Submit
            </Button>
            <hr></hr>
            {enableOtpbox && <><Form.Label key="otp">Otp</Form.Label>
                <Form.Control key="otp_box" type="text" placeholder="Enter otp" value={otp} onChange={(e) => setOtp(e.target.value )}/>
                <Button variant="primary" onClick={onOtpSubmit}>
                Submit
            </Button></>}
            </Form>
        </div>
        {/* <Form>
            <div className="form-group">
                <label for="user">User </label>
                <select name="Users" id="user">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
                </select>
            </div>
            <div>
            <label for="amountlist">Amount </label>
                <select name="amount" id="amount">
                    {amount.map((i)=>{
                        return <option value={i}>{i}</option>
                    })}
                </select>
            </div>
        </Form> */}
            
        
    </>
    );
    
}

export default Recharge;