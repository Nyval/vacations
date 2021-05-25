
import React,{Component} from "react";

export default class Add extends Component{


    handleCounter = ()=>{
        // console.log(this.a);
        let number = document.getElementById("number");
        number.value = number.value + 1;
    }

    render() {
        return <React.Fragment>
            <input type="button" value="הוסף" onClick={this.handleCounter}/>
            <h1 id = "number">1</h1>
        </React.Fragment>;
    }
}