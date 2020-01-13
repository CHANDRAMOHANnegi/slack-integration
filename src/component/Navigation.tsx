// @ts-ignore
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPath from '../utils/ReactPath';


interface INavigationProps {

}

interface INavigationState {
}

class Navigation extends Component<INavigationProps, INavigationState> {
  logout = () => {
    // localStorage.removeItem('attendance-token')
    localStorage.clear();
    // @ts-ignore
    this.props.history.push('/');
  };

  public render() {

    return (
      <div className="navigation">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="">Dashboard</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="" onClick={this.logout}>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}


export default Navigation;
