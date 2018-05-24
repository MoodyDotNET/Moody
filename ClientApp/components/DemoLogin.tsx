import * as React from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { TextField,Card, CardHeader, CardText, RaisedButton } from 'material-ui';

interface LoginState {
    message: string,
    username: string,
    password: string,
}

export class DemoLogin extends React.Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: "Enter your username and password to login",
            username: "",
            password: ""
        };
        this.login.bind(this);
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

    private login() {
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
                        onClick={ () => this.login() }
                    />
                </CardText>
            </Card>
        );
    }
}
