
import React from "react";
import { Container, Card, Button, InputGroup, FormControl} from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Registration() {
    let history = useHistory();

    let tempUser = {
        name: '',
        email: '',
        password: '',
        confirmPass: '',
    };
    
    const handleBlur = (event) => {
        let newValue = event.target.value;
        let propKey = event.target.name;
        tempUser[propKey] = newValue;
    }

    const handleRegisterationClick=(event)=>{

        let keyToText = {
            name:'Name',
            email:'Email',
            password:'Password',
            confirmPass:'Confirm Password'
        }

        // all empty fields error
        let emptyFields = [];        
        for (const key in tempUser) {
            const value = tempUser[key];
            if(value === '') {emptyFields.push(keyToText[key]) ; }            
        }

        if(emptyFields.length == 1) return alert('Please fill the ' + emptyFields.toString() + ' field');
        else if(emptyFields.length > 1) return alert('Please fill the fields: ' + emptyFields.toString());
        
        if (tempUser.password == tempUser.confirmPass){
            alert('Welcome!');
            // call to server.
            //if seccess we need user id and name
            history.push('/',);
        }
        else alert("passwords don't match");
    }
    
    
    // first empty field error
    // for (const key in tempUser) {
    //     const value = tempUser[key];
    //     if(value === '')     
    // alert('Please fill the field:'+keyToText[key]);
    // break;
    
   
    
    /*-------------------------------------*/
    return(
        <React.Fragment>
            <Container style={{marginTop:'100px'}}>
                <Card className="text-center">
                    <Card.Header as="h5">Registration</Card.Header>
                    <Card.Body>
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Name" type="text" name="name" onBlur={handleBlur}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Email" type="email" name="email" onBlur={handleBlur}/>
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Password" type="password" name="password" onBlur={handleBlur}/>
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">****</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Confirm Password" type="password" name="confirmPass" onBlur={handleBlur}/>
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">****</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <Button variant="primary" onClick={handleRegisterationClick}>Register</Button>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    )
}
export default Registration;