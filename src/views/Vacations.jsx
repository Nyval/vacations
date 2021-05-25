import React,{useState} from "react";
import { Container } from "react-bootstrap";
import TopBar from "../components/TopBar";
import BlockVacationsFollowed from "./sub-views/BlockVacationsFollowed";
import BlockVacationsRest from "./sub-views/BlockVacationsRest";

function Vacations(){
    let followedArray = [];
    let restArray = [];
    
    const initialVacations = [
        {
            id: '1',
            name: 'Iceland',
            description: 'Enjoy Iceland',
            followers: '10',
            followedByMe:true,
            price: '100',
            dateStart: '5/2/21',
            dateEnd: '23/3/21',
            // imageSrc: require("./../../images/mars.jpg")
        },
        {
            id: '2',
            name: 'Sweden',
            description: 'Enjoy Sweden',
            followers: '1',
            followedByMe:true,
            price: '200',
            dateStart: '2/2/21',
            dateEnd: '4/5/21',
            // imageSrc: require("./../../images/mars.jpg")
        },
        {
            id: '3',
            name: 'Suriname',
            description: 'Enjoy Suriname',
            followers: '0',
            followedByMe:false,
            price: '$',
            dateStart: '4/3/21',
            dateEnd: '28/3/21',
            // imageSrc: require("./../../images/mars.jpg")
        }
    ];
    // initialVacations = localStorage.getItem('vacationsArray')?JSON.parse(localStorage.getItem('vacationsArray')):initialVacations;
    // let testVac = typeof(localStorage.getItem('vacationsArray'))=="string"?JSON.parse(localStorage.getItem('vacationsArray')):'';
    // try {
    //     console.log(JSON.parse(localStorage.getItem('vacationsArray')));
    // } catch (error) {
    //     console.log(error);
    // }
    const [vacationsArray, setVacationsArray] = useState(initialVacations);
    console.log(vacationsArray);
        // יעיל יותר
    vacationsArray.map((vacationObj,key)=>{
        if(vacationObj.followedByMe === true) followedArray.push(vacationObj);
        else restArray.push(vacationObj);
        return true;
    });  

    // let followedArray = vacationsArray.filter((vacationObj)=>0 < vacationObj.followers)


    // מובן יותר
    // let followedArray = vacationsArray.filter((vacationObj)=>vacationObj.followedByMe==true);
    // let restArray = vacationsArray.filter((vacationObj)=>vacationObj.followedByMe==false); 

    return(
        <React.Fragment>
            <TopBar vacationsArray={vacationsArray} handleVacation={setVacationsArray}/>
            <Container>
                <BlockVacationsFollowed followedArray={followedArray} handleVacation={setVacationsArray} vacationsArray={vacationsArray}/>
                <hr/>
                <BlockVacationsRest restArray={restArray} handleVacation={setVacationsArray} vacationsArray={vacationsArray}/>
            </Container>
        </React.Fragment>
    )
}
export default Vacations;