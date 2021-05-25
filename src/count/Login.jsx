import React,{Component} from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';

export default class Login extends Component{
    vat = 17;
    basePrice=100;
    constructor(props){
        super(props);
        this.state = {
            counter: 0,
            operation: '',
            totalPrice: 0 
        };
    } 

    // componentDidUpdate(){
    //     console.log('test');
    // }
    
    // componentDidMount(){
    //     console.log('222');
    // }

    render() {
        return <React.Fragment>
            <Container>
                {/* Page title */}
                <div style={{textAlign:'center', fontSize:'50px'}}>
                    Counter
                </div>
                {/* Counter operation */}
                <div style={{textAlign:'center', fontSize:'30px', color:'blue', paddingTop:'50px'}}>
                    {this.state.operation}
                </div>
                {/* Counter value */}
                <div style={{textAlign:'center', fontSize:'30px', color:'blue', paddingTop:'50px'}}>
                   {this.state.counter}
                </div>
                {/* Table with buttons */}
                <Row lg={6} style={{display:'flex', justifyContent:'center', justifyItems:'center'}}>
                   <Col style={{textAlign:'center'}}><Button variant="success" onClick={()=>{
                       this.setState({counter:this.state.counter+1, operation:'Add'});
                   }}>הוסף</Button></Col>
                   <Col style={{textAlign:'center'}}><Button variant="danger" onClick={()=>{
                       this.setState({counter:this.state.counter-1, operation:'Subtract'});
                   }}>החסר</Button></Col>
                </Row>
            </Container>
        </React.Fragment>;
    }
}