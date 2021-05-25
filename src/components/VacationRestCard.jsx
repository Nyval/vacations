import React from "react";
import { Card } from "react-bootstrap";
import vacationImageSrc from "../images/mars.jpg";

function VacationRestCard(){
    // const imgSrc = require("./../images/mars.jpg");
    return(
        <React.Fragment>
            <Card style={{ width: '18rem', margin:'10px' }}>
                <Card.Img variant="top" src={vacationImageSrc}/>
                <Card.Body>
                    <Card.Title> Mars </Card.Title>
                    <Card.Text> Enjoy a vacation on Mars </Card.Text>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}
export default VacationRestCard;