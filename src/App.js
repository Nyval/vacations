import './App.css';
// import Login from "./views/Login";
// import Registration from "./views/Registration";
import Vacations from "./views/Vacations";
import { Route, Switch } from "react-router-dom";
import Statistics from "./views/Statistics";
import Registration from "./views/Registration";
import Login from "./views/Login";
import axios from "axios";

// axios.defaults.headers['Content-Type'] = 'application/json';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'JWT fefege...'
}
// axios.defaults.headers = headers;
axios.defaults.headers['Content-Type'] = 'application/json;';
global.axios = axios;

function App() {
  return (
      <Switch>
        <Route exact path="/statistics" component={Statistics}/>
        <Route exact path="/registration" component={Registration}/>
        <Route exact path="/login" component={Login}/>
        <Route path="/" component={Vacations}/>
      </Switch>
  );
}

export default App;

