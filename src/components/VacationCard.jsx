import React,{useState} from "react";
import { Card , Dropdown } from "react-bootstrap";
import vacationImageSrc from "./../images/mars.jpg";
import {CameraFill , XOctagonFill , Pencil} from "react-bootstrap-icons";
import EditVacationModal from "./EditVacationModal";



function VacationCard(props){
    const vacationsArray = props.vacationsArray;
    let vacationInfo = props.vacation; // לזה צריך ליצור מתווך
    const handleVacation = props.handleVacation;
    const followedByMe = vacationInfo.followedByMe;

    const [show, setShow] = useState(false);
    const handleShow = () =>{
        setShow(true);
    }
    const handleClose = (updatedVacation = false) => {
        // if(!updatedVacation || typeof(updatedVacation)!=="object") return false;
        if(updatedVacation){
            let updatedVacationsArray = vacationsArray.map((vacation)=>{
                if (vacation.id == updatedVacation.id) return updatedVacation;
                else return vacation;
            });
            handleVacation(updatedVacationsArray);
        }
        setShow(false);
    }

    const handleDeleteVacation = () => {
        let remainVacations = vacationsArray.filter((vacation)=>vacation.id !== vacationInfo.id);
        handleVacation(remainVacations);
    }
    return(
        <React.Fragment>
            <Card style={{ width: '18rem', margin:'10px' }}>
            <Card.ImgOverlay>
                <Card.Title style= {{backgroundColor: 'rgba(210, 210, 210, 0.85)'}}>
                    {followedByMe === true?
                        <XOctagonFill onClick={()=>{ // unfollow
                            let allNewFollowedVacation = vacationsArray.map((vacation)=>{
                                if(vacation.id===vacationInfo.id){
                                    vacation.followedByMe = false;
                                    vacation.followers=parseInt(vacation.followers)-1;
                                }
                                return vacation;
                            });
                            
                            handleVacation(allNewFollowedVacation);
                            }} style={{cursor:'pointer'}}/>
                        :
                        <CameraFill onClick={()=>{ // follow
                            let allNewRestVacation = vacationsArray.map((vacation)=>{
                                if(vacation.id===vacationInfo.id){
                                    vacation.followedByMe = true;
                                    vacation.followers=parseInt(vacation.followers)+1;
                                }
                                return vacation;
                            });
                            handleVacation(allNewRestVacation);
                            }} style={{cursor:'pointer'}}/>
                    }
                    <span> {vacationInfo.followers} </span>
                    <span style={{float:'right', color:'green'}}> {vacationInfo.price} </span>
                </Card.Title>
            </Card.ImgOverlay>
                <Card.Img variant="top" src={vacationImageSrc}/>
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
                            <Dropdown.Item onClick={handleShow}> Edit </Dropdown.Item>
                            <Dropdown.Item onClick={handleDeleteVacation}> Delete </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>
            <EditVacationModal 
            show={show} 
            handleClose={handleClose} 
            vacationInfo={vacationInfo} // לזה צריך ליצור מתווך
            />
        </React.Fragment>
    )
}
export default VacationCard;