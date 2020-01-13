import React, {Component} from 'react';
import WorkSpaceServices from "../services/WorkSpaceServices";
import {toast} from "react-toastify";
import IInitialState from "../models/interfaces/IInitialState";
import {connect} from "react-redux";
import {Loader} from "./Spinner";
import DashboardHoc from "../hoc/DashboardHoc";

interface IBotListProps {
    match: {
        params: {
            slackappid: string,
            workspaceid: string
        }
    },
}

interface IBotListState {
    bots: Array<object>;
    workspaceId: string
    loading: boolean;
}

class BotList extends Component<IBotListProps, IBotListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            bots: [],
            workspaceId: '',
            loading: true,
        }
    }

    // async componentWillMount() {
    //     const {workspaceid} = this.props.match.params;
    //     const sr = await WorkSpaceServices.fetchBots(workspaceid, 0, 10);
    //     const {data} = sr;
    //     if (!data) {
    //         this.setState({
    //             bots: data,
    //             loading: false
    //         })
    //     }
    //     if (data && sr.data.success) {
    //         let arrayOfItems = sr.data;
    //         this.setState({
    //             bots: arrayOfItems,
    //             workspaceId: workspaceid,
    //             loading: false,
    //         })
    //     }
    // }

    public render() {
        const {bots} = this.state;
        return (
            <DashboardHoc>
                {bots ?
                    (bots.length > 0 ? <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">SlackId</th>
                                <th scope="col">Name</th>
                                <th scope="col">Integrate with slack</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bots.map((bot: any, i: number) =>
                                bot && (<tr className={bot.integrated ? "table-success" : "table-danger"} key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{bot.appId}</td>
                                    <td>{bot.name}</td>
                                    <td>{!bot.integrated ?
                                        <a href={bot.integrationUrl}
                                            // onClick={() => this.handleIntegration(bot.integrationUrl, bot.appId)}
                                           target='popup'>Integrate</a>
                                        : <div> integrated with slack</div>}
                                    </td>
                                </tr>)
                            )}
                            </tbody>
                        </table>
                        : <Loader> fetching Bots...</Loader>)
                    : <h2>unable to fetch bots</h2>
                }
            </DashboardHoc>
        );
    }

    //
    // private handleIntegration = async (integrationUrl: string, appId: string) => {
    //     window.open(integrationUrl, 'popup', 'width=600,height=800');
    //     const {workspaceId} = this.state;
    //     localStorage.removeItem('slack-apps-code');
    //     window.addEventListener('storage', async () => {
    //         const code = localStorage.getItem('slack-apps-code');
    //         if (code === undefined) {
    //             toast.error('Invalid request, please integrate your slack app again');
    //         } else {
    //             toast.success('Code Fetched Successfully');
    //             const sr = await WorkSpaceServices.integrateWithSlack({appId, code, workspaceId});
    //             console.log(sr)
    //         }
    //         //Todo  change integrate button
    //     });
    // }
}

const mapStateToProps = (state: IInitialState) => {
    return {
        currentWorkspace: state.currentWorkspace,
    };
};

// @ts-ignore
export default connect(mapStateToProps, null)(BotList);

