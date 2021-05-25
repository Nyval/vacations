
import React,{useState, useRef} from "react";
// import Axios from "./../helper";
import { Container, Card, Button, InputGroup, FormControl} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { nodeName } from "jquery";
import axios from "axios";

function Login(){
    
    let history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');//false is init value
    const passwordField = useRef(null); //null is init value
    const emailField = useRef(null); //null is init value
    const errorMessageField = useRef(null); //null is init value
    const [buttonDiasbility, setButtonDiasbility] = useState(true);

    // incorrect password
    const validateEmail = (emailInput) =>{
        errorMessageField.current.style.color="red";
        let EMAIL_REGEX = /[0-9a-zA-Z]+@[0-9a-zA-Z]+(\.[a-zA-Z]{1,3})+/;
       
        if(EMAIL_REGEX.test(emailInput)){
            if(passwordField.current.value === '') {
                setErrorMessage("The password is empty!");
                return false;
            }
           
            errorMessageField.current.style.color="green";
            setErrorMessage("All fields are OK!");
            setButtonDiasbility(false);
            return true;
        }
        else {
            setErrorMessage("The email is invalid!");
            setButtonDiasbility(true);
            return false;
        }
    }

    const handleKeyUpEmail = (event)=>{
        let emailInput = event.target.value;
        validateEmail(emailInput);
    }

    const handleKeyUpPassword =(event)=>{
        errorMessageField.current.style.color="red";
        if(passwordField.current.value === '') {
            setErrorMessage("The password is empty!");
            setButtonDiasbility(true);
        }
        else {
            validateEmail(emailField.current.value);
        }
    }

    const handleLoginClick=(event)=>{
        if(validateEmail(emailField.current.value)){
           
            let params={
                email: 'adam@gmail.com',
                password: 'sisma'
            };

            try {
                global.axios.post('http://localhost:3002/login', params)
                // axios.post('http://localhost:3002/login', JSON.stringify(params),axiosConfig)
                .then(msg=>console.log(msg))
                .catch(err=>console.log(err));

                console.log("Request sent!");
                console.log(params);
            } catch (error) {
                // console.log(error);
            }
        }
    }

    
  return(
   <React.Fragment>
      <Container style={{display:'flex', justifyContent:'center', marginTop:'100px'}}>
        <Card className="text-center" style={{width:'400px'}}>
            <Card.Header as="h5">Login</Card.Header>
            <Card.Body>
            <InputGroup className="mb-3">
            <FormControl ref={emailField} placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2" name="email" onKeyUp={handleKeyUpEmail}/> {/* aria? */}
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                </InputGroup.Append>
             </InputGroup>
            <InputGroup className="mb-3">
            <FormControl ref={passwordField} placeholder="Password" aria-label="Recipient's username" aria-describedby="basic-addon2" name="password" onKeyUp={handleKeyUpPassword}/>
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">****</InputGroup.Text>
                </InputGroup.Append>
             </InputGroup>
                <Button variant="primary" onClick={handleLoginClick} disabled={buttonDiasbility}>Login</Button>
            </Card.Body>
            <h6>Not registered? <a href='/'>Click Here</a></h6>
            <h1 style={{color:'red'}} ref={errorMessageField}>{errorMessage}</h1>
         
            {/* message */}
        </Card>
      </Container>
  </React.Fragment>);
}
export default Login;