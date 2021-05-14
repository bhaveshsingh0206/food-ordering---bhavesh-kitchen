// import classes from './App.module.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import { useContext } from 'react';
import AuthContext from '../store/authCtx';

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Router>
      <Switch>
      {!authCtx.isLoggedIn&&<Route path="/login" component={Login} />}
        {authCtx.isLoggedIn&&<Route path="/" component={Home} exact/>}
        <Route path="*"><Redirect to={authCtx.isLoggedIn?"/":"/login"}/></Route>
      </Switch>
    </Router>
    
    
  );
}

export default App;
