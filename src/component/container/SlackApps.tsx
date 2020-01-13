import React, { Component, useEffect, useState } from 'react';
import ServiceResponse from '../../services/ServiceResponse';
import SlackAppService from '../../services/SlackAppService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import DashboardNav from '../DashboardNav';
import ReactPath from '../../utils/ReactPath';
import { Loader, LodingButton } from '../Spinner';


interface ISlackApps {
  appId: string,
  name: string,
  integrationUrl: string,
  isIntegrated: boolean,
}

interface ISlackAppsState {
  slackApps: Array<ISlackApps>,
  loading: boolean;
}

class SlackApps extends Component <any, ISlackAppsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      slackApps: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const sr: ServiceResponse<any> = await SlackAppService.fetchSlackApps();
    const { data } = sr;
    if (!data) {
      this.setState({
        loading: false,
      });
    }
    if (data && data.success) {
      const { data } = sr.data;
      this.setState(
        {
          slackApps: data,
          loading: false,
        },
      );
    }
  }

  slackIntegrationButton = (props: any) => {
    const { integrationUrl, appId, isIntegrated } = props.slackapp;
    const [loading, setLoading] = useState(false);
    const [integrated, setIntegration] = useState(isIntegrated);

    const handleIntegration = async (integrationUrl: string, appId: string) => {
      console.log('handle integration');
      window.open(integrationUrl, 'popup', 'width=600,height=800');
      localStorage.removeItem('slack-apps-code');
      window.addEventListener('storage', async () => {
        const code = localStorage.getItem('slack-apps-code');
        console.log(code);
        if (code === undefined) {
          toast.error('Invalid request, please integrate your slack app again');
        } else {
          toast.success('Code Fetched Successfully');
          const sr = await SlackAppService.integrateWithSlack(code, appId);
          const { data } = sr;
          console.log(sr);
          if (data && data.success) {
            setLoading(false);
            setIntegration(true);
          }
        }
      });
    };

    return (
      <div>
        {!integrated ?
          (!loading ? <a href={integrationUrl}
                         target='popup'
                         onClick={() => {
                           setLoading(true);
                           handleIntegration(integrationUrl, appId);
                         }}>
            <img src="https://api.slack.com/img/sign_in_with_slack.png" alt={''}/>
          </a> : <LodingButton/>) :
          <Link className="btn btn-primary" to={ReactPath.dashboard(appId)}
                style={{ width: '175px' }}
          >go to dashboard</Link>}
      </div>
    );
  };

  render() {
    const { slackApps, loading } = this.state;
    return (
      <div className="container-fluid align-items-center ">
        <DashboardNav/>
        {(slackApps.length > 0) ? (
            <ul className="list-group">
              <li className="list-group-item  d-flex justify-content-around flex-row">
                <div className="">Slack apps</div>
              </li>
              {slackApps.map(slackApp =>
                <li className="list-group-item  d-flex justify-content-between flex-grow-1 align-items-center flex-row"
                    key={slackApp.appId}>
                  <div className="d-none d-sm-block flex-1"><img
                    src="https://a.slack-edge.com/d9577/img/avatars-teams/ava_0026-34.png"
                    alt="slackbot"/>
                  </div>
                  <div className="">{slackApp.name} </div>
                  <this.slackIntegrationButton slackapp={slackApp}/>
                </li>,
              )}
            </ul>)
          : (loading ? <div><Loader>fetching slack apps...</Loader></div> :
            <h2>Something went wrong
              <Link className="btn-danger btn"
                    to={ReactPath.login}>Login again</Link>
            </h2>)}
      </div>
    );
  }
}

export default SlackApps;
