import * as React from 'react';
import { Link, NavLink, Redirect, RouteComponentProps } from 'react-router-dom';
import { TextField,Card, CardHeader, CardText, RaisedButton } from 'material-ui';
import { FormEvent } from 'react';

interface LoginState {
    message: string,
    username: string,
    password: string,
}

export class Login extends React.Component<any, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            message: "Enter your username and password to login",
            username: "",
            password: ""
        };
    }    

    private login(event: FormEvent<HTMLFormElement>) {
        this.setState({
            message: 'Logging in...'
        })
        fetch(`api/Member/login?username=${this.state.username}&password=${this.state.password}`, {
            credentials: "same-origin"
        })
        .then(response => response.json() as Promise<boolean>)
        .then(data => {
            if (data == true) {
                this.setState({
                    message: `Welcome ${this.state.username}`,
                });
                this.props.closeLoginForm();
                this.props.getUserName(this.state.username);
            } else {
                this.setState({
                    message: 'Incorrect username or password!',
                    password: ''
                })
            }
        });
        event.preventDefault();
        return false;
    }

    public render() {
        return (
            <div>
                { this.state.message.indexOf('Welcome') >= 0 && <Redirect to="/user" push/> }                
                <h2>Login</h2>
                <p>{ this.state.message }</p>
                <form onSubmit= { (e) => this.login(e) }>
                    <TextField
                        hintText="Username"
                        floatingLabelText="Username"
                        value={this.state.username}
                        onChange={ (e, v) => this.setState({ username: v }) }
                        fullWidth
                    />
                    <br/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type = "password"
                        value={this.state.password}
                        onChange={ (e, v) => this.setState({ password: v }) }
                        fullWidth
                    />
                    <br/>
                    <RaisedButton
                        label="Login"
                        primary={true}
                        type="submit"
                    />
                </form>
            </div>
        );
    }
}
