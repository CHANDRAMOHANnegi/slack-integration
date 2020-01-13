// @ts-ignore
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactPath from '../utils/ReactPath';
import { RouterProps } from 'react-router';

interface IDashboardSidebarProps extends RouterProps {
  match: {
    params: {
      slackappid: string,
      workspaceid: string
    }
  },
}

interface IDashboardSidebarState {
}

class DashboardSidebar extends Component<IDashboardSidebarProps, IDashboardSidebarState> {

  render() {
    const { slackappid, workspaceid } = this.props.match.params;
    return (
      <div className="sidebar">
        <div className="card text-center ">
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">With supporting text below as a </p>
          </div>
        </div>
        <ul className="list-group">
          <li className="list-group-item "><Link to={ReactPath.slackApps}>Home</Link></li>
          <li className="list-group-item "><Link to={ReactPath.dashboard(slackappid)}>Workspace List</Link></li>
          <li className="list-group-item"><Link
            to={ReactPath.slackUsers(slackappid, workspaceid)}>Slack users </Link></li>
          <li className="list-group-item"><Link
            to={ReactPath.workspaceSetting(slackappid, workspaceid)}>Setting</Link></li>
        </ul>
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(DashboardSidebar);
