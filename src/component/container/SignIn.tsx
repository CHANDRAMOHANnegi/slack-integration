import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import IReduxAction from '../../redux/IReduxAction';
import UserAction from '../../redux/actions/UserAction';
import ILoginStateEnum from '../../constants/ILoginStateEnum';
import ReactPath from '../../utils/ReactPath';

interface ISignInProps {
  history: any,
  loggedIn: any
}

interface ISignInState {
  email: string;
  password: string;
}

class SignIn extends Component<ISignInProps, ISignInState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = this.state;
    // @ts-ignore
    this.props.loginUser({ email, password });
  };


  handleChange = (e: React.SyntheticEvent) => {
    // @ts-ignore
    const [name, value] = [e.target.name, e.target.value];
    this.setState({
      ...this.state,
      [name]: value,
    });
  };


  render() {
    const { history } = this.props;
    if (this.props.loggedIn === ILoginStateEnum.LOGGEDIN_SUCCESS && localStorage.getItem('jwt')) {
      history.push(ReactPath.slackApps);
    }

    return (
      <section className="forms container align-middle ">
        <div className="formDiv ">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1"
                     onChange={this.handleChange}
                     name="email"
                     aria-describedby="emailHelp"
                     placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1"
                     onChange={this.handleChange}
                     placeholder="Password"
                     name="password"/>
            </div>
            <button type="submit" className="btn btn-primary align-self-center ">SignIn</button>
          </form>
          <button onClick={() => history.push(ReactPath.signUp)}
                  className="btn  align-self-center ">Register
          </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IReduxAction>) => {
  return {
    loginUser: ({ email = '', password = '' }) => UserAction.loginAction({ email, password })(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
