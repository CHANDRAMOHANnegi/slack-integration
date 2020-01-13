import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import UserAction from '../../redux/actions/UserAction';
import IWorkspace from '../../models/interfaces/IWorkspace';
import WorkSpaceServices from '../../services/WorkSpaceServices';
import DashboardHoc from '../../hoc/DashboardHoc';
import ServiceResponse from '../../services/ServiceResponse';
import ReactPath from '../../utils/ReactPath';
import { RouterProps } from 'react-router';
import { Loader } from '../Spinner';
import { Link } from 'react-router-dom';
import DashboardNav from '../DashboardNav';
import DashboardSidebar from '../DashboardSidebar';
import moment from 'moment';


interface IDashboardState {
  workspaceArray: Array<{}>,
  loading: boolean
}

interface IDashboardProps extends RouterProps {
  match: {
    params: { slackappid: string }
  },

  currentWorkspace(workspace: IWorkspace): any;
}

class Dashboard extends Component<IDashboardProps, IDashboardState> {

  constructor(props: any) {
    super(props);
    this.state = {
      workspaceArray: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const sr: ServiceResponse<any> = await WorkSpaceServices.fetchAllWorkSpace();
    console.log(sr);
    const { data } = sr;
    if (!data) {
      this.setState({
        loading: false,
      });
    }
    if (data && data.success) {
      const { workspaces } = data.data;
      this.setState({
        workspaceArray: workspaces,
        loading: false,
      });
    }
  }

  handleCurrentWorkspace = (workspace: IWorkspace) => {
    //Todo this is temporary
    const { id: workspaceId } = workspace;
    localStorage.setItem('workspaceId', workspaceId);
    ReactPath.navigateTo(this.props, ReactPath.slackUsers(this.props.match.params.slackappid, workspaceId));
    this.props.currentWorkspace(workspace);
  };

  WorkspaceCard = (props: any) => {
    const { workspace } = props;
    return <div className="card" style={{ width: '18rem' }}
                onClick={() => this.handleCurrentWorkspace(workspace)}>
      <div className="card-body">
        <h5 className="card-title">{workspace.teamName} </h5>
        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk
          of the card's content.
        </p>
      </div>
    </div>;
  };

  Sidebar = () => {
    return <div className="sidebar">
      <div className="card text-center ">
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a </p>
        </div>
      </div>
      <ul className="list-group">
        <li className="list-group-item "><Link to={ReactPath.slackApps}>Home</Link></li>
      </ul>
    </div>;
  };

  render() {
    console.log(moment().set({ 'hour': 7, 'minutes': 30 }).format());
    const { workspaceArray, loading } = this.state;
    return (
      <div className="dashboard">
        <DashboardNav/>
        <div className={'container-fluid'}>
          <div className={'row'}>
            <div className={'col-md-4 col-lg-3 '}>
              <this.Sidebar/>
            </div>
            <div className={'col-md-8 col-lg-9'}>
              {workspaceArray.length > 0 ? <div className='workspaceContainer '>
                  {workspaceArray.map((workspace, index) => {
                    if (workspace)
                      return <this.WorkspaceCard workspace={workspace} key={index}/>;
                  })}
                </div> :
                (loading ? <Loader>Loading workspace ...</Loader> :
                    <h2>Something went wrong...
                      <Link className="btn-danger btn"
                            to={ReactPath.slackApps}>Go to Slack apps</Link>
                    </h2>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    currentWorkspace: ({ createdAt = '', id = '', name = '', status = '', UpdatedAt = '' }: any) =>
      UserAction.currentWorkspace({ createdAt, id, name, status, UpdatedAt })(dispatch),
  };
};
const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.loggedIn,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
