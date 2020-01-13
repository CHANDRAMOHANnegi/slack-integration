import React, { Component } from 'react';
import ServiceResponse from '../services/ServiceResponse';
import SlackUserService from '../services/SlackUserService';
import DashboardHoc from '../hoc/DashboardHoc';
import { Loader } from './Spinner';
import { Link } from 'react-router-dom';
import ReactPath from '../utils/ReactPath';


interface IEmployeeListProps {
  match: {
    params: { workspaceid: string, slackappid: string }
  }
}

interface IEmployeeListState {
  offset: number;
  limit: number;
  slackUsers: Array<object>;
  loading: boolean;
}

class SlackUsers extends Component<IEmployeeListProps, IEmployeeListState> {

  constructor(props: any) {
    super(props);
    this.state = {
      offset: 0,
      limit: 10,
      slackUsers: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { offset, limit } = this.state;
    const { workspaceid } = this.props.match.params;
    const sr: ServiceResponse<any> = await SlackUserService.fetchSlackUsers(workspaceid, offset, limit);
    console.log(sr);
    const { data } = sr;
    if (!data) {
      this.setState({
        loading: false,
        slackUsers: data,
      });
    }
    if (data && data.success) {
      const slackUsers = data.data;
      this.setState({ slackUsers: slackUsers, loading: false });
    }
  }

  updateSlackUsers = async () => {
    const { workspaceid, slackappid } = this.props.match.params;
    console.log(workspaceid, slackappid);
    const sr: ServiceResponse<any> = await SlackUserService.updateSlackUsers(slackappid, workspaceid);
    console.log(sr);
    const { data } = sr;
    if (!data || !data.success) {
      this.setState({
        loading: false,
      });
    }
    if (data.success) {
      this.setState({
        loading: false,
      });
    }
  };


  public render() {
    const { slackUsers, loading } = this.state;
    const { workspaceid, slackappid } = this.props.match.params;
    return (
      <DashboardHoc>
        <button className="btn-danger btn-bg" onClick={() => this.updateSlackUsers()}>Update slack Users</button>
        {slackUsers ?
          slackUsers.length ? <table className="table">
              <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
              </thead>
              <tbody>
              {slackUsers.map((slackUser: any, i: number) =>
                <tr className={'table-success'} key={i}>
                  <th scope="row">{i + 1}</th>
                  <td><Link to={ReactPath.attendance(slackappid, workspaceid, slackUser.slackId)}>{slackUser.name}</Link>
                  </td>
                  <td>{slackUser.email}</td>
                </tr>)}
              </tbody>
            </table> :
            (loading ?
              (<div>
                <Loader>Loading slack users ...</Loader>
              </div>)
              : (<div>No Data found</div>)) :
          <h2>Something went wrong
            <Link className="btn-danger btn"
                  to={ReactPath.slackApps}>Go to slack apps</Link>
          </h2>}
      </DashboardHoc>);
  }
}

export default SlackUsers;
