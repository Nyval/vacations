import React from "react";
import { Container } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import TopBar from "../components/TopBar";

function Statistics(props) {
    const {vacationsArray} = props.history.location.state;
    console.log(vacationsArray);
    // localStorage.removeItem('vacationsArray');
    // localStorage.setItem('vacationsArray',JSON.stringify(vacationsArray));
    const statsFollowedArray = vacationsArray.filter((vacationObj)=>0 < vacationObj.followers);

    let vacationsLabels = [];
    let vacationsData = [];

    statsFollowedArray.forEach(vacation => {
        vacationsLabels.push(vacation.name);
        vacationsData.push(vacation.followers);
    });

    const data = { // data is an object
        labels: vacationsLabels, // ['Sweden', 'Spain'...] names of destinations . [vacation.name]
        datasets: [ {
            label: 'Vacation Followers',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(75,192,192)',
            borderColor: 'rgb(75,192,192)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(75,192,192)',
            pointBackgroundColor: '#fff',
            data: vacationsData,
            scaleStartValue: 0            
        }
    ]
    };

    const options = {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true   // minimum value will be 0.
                }
            }]
        }
    }

    return (
        <React.Fragment>
            <TopBar/>
            <Container>
                <h1 style={{textAlign:'center'}}> Number of Followers by Vacation </h1>
                <Bar data={data} options={options}/>
            </Container>
        </React.Fragment>
    )
}

export default Statistics;

