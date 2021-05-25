import React,{useState,useEffect} from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import AddVacationModal from "./AddVacationModal" ;
import { Link, useHistory } from "react-router-dom";

function TopBar(props){
    let history = useHistory();
    const vacationsArray = props.vacationsArray;
    console.log('topbar:',vacationsArray);
    const handleVacation = props.handleVacation;
    const [show, setShow] = useState(false);
    const handleAddVacation = ()=>setShow(true);
    const handleClose = (newVacation)=> {
        if(newVacation != false){
            let oldVacationsArray = vacationsArray.map((vacation)=>{
                return vacation;
            });
            oldVacationsArray.push(newVacation);
            let newVacationsArray = oldVacationsArray;
            handleVacation(newVacationsArray);
        }
        setShow(false);
    }

    return(
        <React.Fragment>
             <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={()=>{
                    history.push('/');
                }} style={{cursor:'pointer'}}>Vacations</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Item>
                            <Nav.Link onClick={handleAddVacation}> Add Vacation</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={()=>history.push('/statistics',{vacationsArray:vacationsArray})}>Statistics</Nav.Link>
                            {/* <Link 
                            to={{
                                pathname:'/statistics',
                                state:{
                                    vacationsArray:vacationsArray
                                }
                            }}> Statistics </Link> */}
                        </Nav.Item>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end" style={{marginRight:'50px'}}>
                    <Nav>
                    <NavDropdown title="UserName" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        <NavDropdown.Item href="/">Delete Account</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AddVacationModal 
            show={show} 
            handleClose={handleClose} 
            />
        </React.Fragment>
    )
}
export default TopBar;