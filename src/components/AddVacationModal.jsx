import React,{useState} from "react";
import {Modal, Button, FormControl, Form, Container} from "react-bootstrap"
import '../../src/index.css';

function AddVacationModal(props){
    const handleClose = props.handleClose;
    const show = props.show;
    let tempVacation = {
        id: '4',
        name: '',
        description: '',
        followers: '0',
        followedByMe:false,
        price: '',
        dateStart: '',
        dateEnd: ''
    };

    const handleBlur = (event) => {
        let newValue = event.target.value; // in order to not create blur for each field
        let propKey = event.target.name;
        tempVacation[propKey] = newValue;
    }

    const cancelAndClose = () =>{
        handleClose(false);
    }

    const saveAndClose = () => {
        let newVacation = tempVacation;
        // for (const key in tempVacation) {
        //     const element = tempVacation[key];
        //     if(element == '' && element != false) return alert("Please fill the "+key+" field");
        // }
        // vacationsArray.push(tempVacation);
        handleClose(newVacation);
    }

    return (
        <React.Fragment>   
            <Modal show={show} onHide={cancelAndClose}>
          
            <Modal.Header closeButton>
                <Modal.Title>Add Vacation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" name="name" placeholder="Name" onBlur={handleBlur} style={{margin:'5px'}}/>
                    <Form.Control type="text" name="description" placeholder="Description" onBlur={handleBlur} style={{margin:'5px'}}/>
                    <Form.Control type="date" name="dateStart" placeholder="Start date" onBlur={handleBlur} style={{margin:'5px'}}/>
                    <Form.Control type="date" name="dateEnd" placeholder="End date" onBlur={handleBlur} style={{margin:'5px'}}/>
                    <Form.Control type="number" name="price" placeholder="Price" onBlur={handleBlur} style={{margin:'5px'}}/>
                </Form.Group>
            </Form>
   
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick = {cancelAndClose}> Close </Button>
                <Button variant="primary" onClick = {saveAndClose}> Save </Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    );

}
export default AddVacationModal;
