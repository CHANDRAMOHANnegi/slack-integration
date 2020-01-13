import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ILoginStateEnum from './constants/ILoginStateEnum';
import SignUp from './component/container/SignUp';
import SignIn from './component/container/SignIn';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../src/assets/scss/main.scss';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import ReactPath from './utils/ReactPath';
import IntegrateAppComponent from './component/IntegrateAppComponent';
import SlackApps from './component/container/SlackApps';
// import BotList from "./component/BotList"

import SlackUsers from './component/SlackUsers';
import Dashboard from './component/container/Dashboard';
import Calendar from './component/Calendar';
import WorkspaceSetting from './component/WorkspaceSetting';

interface IAppProps {
  loggedIn: ILoginStateEnum,
  currentUser: string | null
}

interface IAppState {
}

toast.configure();

class App extends Component<IAppProps, IAppState> {
  render() {

    const { loggedIn } = this.props;
    console.log(this.props);
    return (
      <div>
        <Router>
          {localStorage.getItem('jwt') && (loggedIn == ILoginStateEnum.LOGGEDIN_SUCCESS) ? (
            <Switch>
              <Route path={ReactPath.slackApps} component={SlackApps}/>
              <Route path={ReactPath.integrateApp} component={IntegrateAppComponent}/>
              {/*<Route path={ReactPath.botList()} component={BotList}/>*/}
              <Route path={ReactPath.slackUsers()} component={SlackUsers}/>
              <Route path={ReactPath.workspaceSetting()} component={WorkspaceSetting}/>
              <Route path={ReactPath.attendance()} component={Calendar}/>
              <Route path={ReactPath.dashboard()} component={Dashboard}/>
              <Route path={ReactPath.calendar} component={Calendar}/>
              <Redirect from={'/'} to={ReactPath.slackApps}/>
            </Switch>
          ) : (
            <>
              <Route path={ReactPath.signUp} component={SignUp}/>
              <Route path={ReactPath.login} exact component={SignIn}/>
              <Redirect to={ReactPath.login}/>
            </>
          )}
        </Router>
        <ToastContainer/>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, null)(App);

                