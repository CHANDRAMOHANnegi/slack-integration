import React, {Component} from 'react';
import {withRouter} from "react-router";
import queryString from 'query-string';

class IntegrateAppComponent extends Component {
    constructor(props: any) {
        super(props);
        console.log("integration component")
    }

    componentDidMount(): void {

        // @ts-ignore
        const paramsObj = queryString.parse(this.props.location.search);
        const code = paramsObj.code;
        console.log(code);
        if (!code) {
            localStorage.setItem('slack-apps-code', '0')
        } else {
            // @ts-ignore
            localStorage.setItem('slack-apps-code', code);
        }
        window.close();
    }

    render() {
        console.log('code')
        return (
            <div>
                Hello integrating
            </div>
        );
    }
}

// @ts-ignore
export default withRouter(IntegrateAppComponent);
