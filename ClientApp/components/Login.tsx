import * as React from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { TextField,Card, CardHeader, CardText, RaisedButton } from 'material-ui';
import { FormEvent } from 'react';

interface LoginState {
    message: string,
    username: string,
    password: string,
}

export class Login extends React.Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: "Enter your username and password to login",
            username: "",
            password: ""
        };
    }

    private changeUsername(event: React.FormEvent<{}>, value: string) {
        this.setState({
            username: value
        });
    }

    private changePassword(event: React.FormEvent<{}>, value: string) {
        this.setState({
            password: value
        })
    }

    private login(event: FormEvent<HTMLFormElement>) {
        this.setState({
            message: 'Logging in...'
        })
        fetch(`api/Authen/login?username=${this.state.username}&password=${this.state.password}`)
        .then(response => response.json() as Promise<boolean>)
        .then(data => {
            if (data == true) {
                this.setState({
                    message: `Welcome ${this.state.username}`,
                })
            } else {
                this.setState({
                    message: 'Incorrect username or password!'
                })
            }
        });
        event.preventDefault();
        return false;
    }

    public render() {
        return (
            <Card>
                { this.state.message.indexOf('Welcome') >= 0 && <Redirect to="/fetchdata" push/> }                
                <CardHeader
                    title = "Login"
                    subtitle = {this.state.message}
                />
                <CardText>
                    <form onSubmit= { (e) => this.login(e) }>
                        <TextField
                            hintText="Username"
                            floatingLabelText="Username"
                            onChange={ (e, v) => this.changeUsername(e, v) }
                        />
                        
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            type = "password"
                            onChange={ (e, v) => this.changePassword(e, v) }
                        />
                        <br/>
                        <RaisedButton
                            label="Login"
                            primary={true}
                            type="submit"
                        />
                    </form>
                </CardText>
            </Card>
        );
    }
}
