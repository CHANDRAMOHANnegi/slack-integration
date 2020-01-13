import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import IReduxAction from '../redux/IReduxAction';
import UserAction from '../redux/actions/UserAction';
import { Link } from 'react-router-dom';
import ReactPath from '../utils/ReactPath';

interface IDashboardNavProps {
}

interface IDashboardNavState {
}

class DashboardNav extends Component<IDashboardNavProps, IDashboardNavState> {

  logout = () => {
    localStorage.removeItem('jwt');
    // @ts-ignore
    this.props.logoutUser();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link " to={ReactPath.slackApps}>Slack apps</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ReactPath.login} onClick={this.logout}>LogOut</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IReduxAction>) => {
  return {
    logoutUser: () => UserAction.logoutAction()(dispatch),
  };
};


// @ts-ignore
export default connect(null, mapDispatchToProps)(withRouter(DashboardNav));
