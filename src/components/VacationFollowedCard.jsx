import React from "react";
import { Card, Dropdown} from "react-bootstrap";
import vacationImageSrc from "./../images/mars.jpg";
import {XOctagonFill , Pencil} from "react-bootstrap-icons";

function VacationFollowedCard(props){

    let vacationInfo = props.vacation;
    console.log(vacationInfo);

    return(
        <React.Fragment>
            <Card style={{ width: '18rem', margin:'10px'}}>
            <Card.ImgOverlay>
                <Card.Title style= {{backgroundColor: 'rgba(210, 210, 210, 0.85)'}}>
                    <XOctagonFill onClick={()=>{
                        
                    }} style={{cursor:'pointer'}}/>
                    <span> {vacationInfo.followers} </span>
                    <span style={{float:'right', color:'green'}}> {vacationInfo.price} </span>
                </Card.Title>
            </Card.ImgOverlay>
                <Card.Img variant="top" src={vacationImageSrc} />
                <Card.Body>
                    <Card.Title> 
                    <div style={{textAlign:'center'}}>
                        <span> {vacationInfo.dateStart} </span> - <span> {vacationInfo.dateEnd} </span>
                    </div>
                    <p> {vacationInfo.name} </p>
                    </Card.Title>
                    <Card.Text> {vacationInfo.description} </Card.Text>
                    <Dropdown style={{float:'right'}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <Pencil />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}
export default VacationFollowedCard;