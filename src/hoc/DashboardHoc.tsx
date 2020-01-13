// @ts-ignore
import React, {Component} from 'react';
import DashboardSidebar from "../component/DashboardSidebar";
import DashboardNav from "../component/DashboardNav";

class DashboardHoc extends Component {
    render() {
        return (
            <div className="dashboard">
                <DashboardNav/>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-md-4 col-lg-3 '}>
                            <DashboardSidebar/>
                        </div>
                        <div className={'col-md-8 col-lg-9'}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardHoc;
