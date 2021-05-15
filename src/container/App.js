// import classes from './App.module.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import { useContext } from 'react';
import AuthContext from '../store/authCtx';
import {MenuContextProvider} from '../store/menuCtx'
const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Router>
      <Switch>
      {!authCtx.isLoggedIn&&<Route path="/login" component={Login} />}
        {authCtx.isLoggedIn&&<Route path="/" exact><MenuContextProvider><Home /></MenuContextProvider></Route>}
        <Route path="*"><Redirect to={authCtx.isLoggedIn?"/":"/login"}/></Route>
      </Switch>
    </Router>
    
    
  );
}

export default App;
