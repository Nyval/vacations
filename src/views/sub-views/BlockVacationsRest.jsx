import React from "react";
import {  } from "react-bootstrap";
import VacationCard from "./../../components/VacationCard"
// import VacationRestCard from "./../../components/VacationRestCard"

function BlockVacationsRest(props){
    const vacationsArray = props.vacationsArray;
    let vacationRestArray = props.restArray;
    const handleVacation = props.handleVacation;
    return(
        <React.Fragment>
            <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                <h1>שאר החופשות</h1>
            </div>
            <div style={{display:'flex', justifyContent:'center', justifyItems:'center', flexWrap:'wrap'}}>
            {vacationRestArray.map((vacationObj, key)=>{
                   return <VacationCard key={"VacationCard"+key} vacation={vacationObj} handleVacation={handleVacation} vacationsArray={vacationsArray}/>;
                })}
            </div>
        </React.Fragment>
    )
}
export default BlockVacationsRest;