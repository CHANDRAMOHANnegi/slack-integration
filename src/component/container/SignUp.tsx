import React, {Component} from 'react'
import UserServices from "../../services/UserService";

interface ISignUpProps {
}

interface ISignUpState {
    name: string
    email: string
    password: string
}

export default class SignUp extends Component<ISignUpProps, ISignUpState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
        }
    }

    handleSubmit = async (e: React.SyntheticEvent,) => {
        e.preventDefault();
        const {name, email, password} = this.state;
        const response = await UserServices.signup(name, email, password);
        try {
            // @ts-ignore
            const {history} = this.props;
            response.success && history.push('/');
        } catch (e) {
        }
    };

    handleChange = (e: React.SyntheticEvent) => {
        // @ts-ignore
        const [name, value] = [e.target.name, e.target.value];
        this.setState({
            ...this.state,
            [name]: value,
        })
    };

    render() {
        // @ts-ignore
        const {history} = this.props;
        return (
            <section className="forms container align-middle ">
                <div className="formDiv ">
                    <form onSubmit={this.handleSubmit}>
                        <h2 className="align-self-center">SignUp</h2>

                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control"
                               onChange={this.handleChange}
                               name="name"
                               aria-describedby="emailHelp"
                               placeholder="E-mail"/>

                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               onChange={this.handleChange}
                               name="email"
                               aria-describedby="emailHelp"
                               placeholder="Email"/>

                        <label htmlFor="exampleInputEmail1">Password</label>
                        <input type="password" className="form-control"
                               onChange={this.handleChange}
                               name="password"
                               placeholder="password"/>
                        <button type="submit" className="btn btn-primary align-self-center ">SignUp</button>
                    </form>
                    <button onClick={() => history.push('/')} className="btn  align-self-center ">Login</button>
                </div>
            </section>
        )
    }
}
