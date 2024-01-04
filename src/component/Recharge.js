import CNavbar from "./CNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/recharge.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
const Recharge = () =>{
    const amount = [5,10,20,50,100,200,500,1000,2000,5000,10000,20000];

    return (
        <>
        <CNavbar></CNavbar>
        <div className="rechargeform">
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Select >
           
                    {amount.map((i)=>{
                        return <option value={i}>{i}</option>
                    })}
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
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