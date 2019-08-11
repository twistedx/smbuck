import LoginPage from './components/LoginPage/Login/Login';
import Dashboard from './components/DashboardPage/Dashboard/Dashboard';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './components/pages/About';
import Register from './components/Forms/Register/Register';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import ContestState from './context/contest/ContestState';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Footer from './components/Layout/Footer/Footer';
import EditUser from './components/Forms/EditUser/EditUser';
import EditEntry from './components/Forms/EditEntry/EditEntry';
import ContestDisplay from './components/DashboardPage/Contest/ContestDisplay';
import CCF from './components/Forms/CreateContestForm/CCF';
import AlertState from './context/alert/AlertState';
import './App.css';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    M.AutoInit();
    //eslint-disable-next-line
  }, []);


  return (
    <AuthState>
      <ContestState>
        <AlertState>
          <Router>
            <Switch>
              <Route exact path='/' component={Dashboard} key={Dashboard.name} />
              <Route exact path='/about' component={About} key={About.name} />
              <Route exact path='/register' component={Register} key={Register.name} />
              <Route exact path='/login' component={LoginPage} key={LoginPage.name} />
              <Route exact path='/edituser' component={EditUser} key={EditUser.name} />
              <Route exact path='/ccf' component={CCF} key={CCF.name} />
              <Route exact path='/ContestDisplay/:id' component={ContestDisplay} key={ContestDisplay.name} />
              <Route exact path='/editentry/:id' component={EditEntry} key={EditEntry.name} />
            </Switch>
            <Footer />
          </Router>
        </AlertState>
      </ContestState>
    </AuthState>
  )
}

export default App;
