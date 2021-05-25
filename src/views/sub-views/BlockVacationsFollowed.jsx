import React from "react";
import {  } from "react-bootstrap";
import VacationCard from "./../../components/VacationCard";
// import VacationFollowedCard from "./../../components/VacationFollowedCard";
// import vacationImageSrc from "./../../images/mars.jpg";


function BlockVacationsFollowed(props){
    const vacationsArray = props.vacationsArray;
    const vacationFollowedArray = props.followedArray; // למה פה זה לט ולא קונסט?
    const handleVacation = props.handleVacation;

    // let mappedVacationsArray = vacationsArray.map((vacation)=>{
    //     return vacation;
    // });

    return(
        <React.Fragment>
            <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                <h1>חופשות במעקב</h1>
            </div>
            <div style={{display:'flex', justifyContent:'center', justifyItems:'center', flexWrap:'wrap'}}>
                {vacationFollowedArray.map((vacationObj, key)=>{
                   return <VacationCard 
                   key={"VacationCard"+key} 
                   vacation={vacationObj} // מתווך
                   handleVacation={handleVacation} 
                   vacationsArray={vacationsArray}
                   />;
                })}
            </div>
        </React.Fragment>
    )
}
export default BlockVacationsFollowed;