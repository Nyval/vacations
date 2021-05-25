import React,{useState} from "react";
import {Modal, Button, FormControl, Form} from "react-bootstrap"
import '../../src/index.css';

function EditVacationModal(props){    
    const handleClose = props.handleClose;
    const show = props.show;
    let tempVacation={};

    for (const key in props.vacationInfo) {
        const value = props.vacationInfo[key];
        tempVacation[key]=value;
    }

    // initial values
    const name = props.vacationInfo.name;
    const description = props.vacationInfo.description;
    const dateStart = props.vacationInfo.dateStart;
    const dateEnd = props.vacationInfo.dateEnd;
    const price = props.vacationInfo.price;

    const handleBlur = (event) => {
        let newValue = event.target.value;
        let propKey = event.target.name;
        tempVacation[propKey] = newValue;
    }

    const cancelAndClose = () =>{
        handleClose(false);
    }

    const saveAndClose = () => {
        let updatedVacation = tempVacation;
        handleClose(updatedVacation);
    }

    return (
        <React.Fragment>   
            <Modal show={show} onHide={cancelAndClose}>
          
            <Modal.Header closeButton>
                <Modal.Title>Edit Vacation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" name="name" placeholder="Name" defaultValue={name} onBlur={handleBlur} style={{margin:'5px'}}/>
                    <Form.Control type="text" name="description" placeholder="Description" defaultValue={description} onBlur={handleBlur} style={{margin:'5px'}}/>
                    <Form.Control type="date" name="dateStart" placeholder="Start date" defaultValue={dateStart} onBlur={handleBlur} style={{margin:'5px'}}/>
                    <Form.Control type="date" name="dateEnd" placeholder="End date" defaultValue={dateEnd} onBlur={handleBlur} style={{margin:'5px'}}/>
                    <Form.Control type="number" name="price" placeholder="Price" defaultValue={price} onBlur={handleBlur} style={{margin:'5px'}}/>
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
export default EditVacationModal;


// ערך מעודכן
// תז לשדה
// name = ערך מעודכן