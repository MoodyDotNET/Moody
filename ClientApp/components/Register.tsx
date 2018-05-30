import * as React from 'react';
import { Link, NavLink, Redirect, RouteComponentProps } from 'react-router-dom';
import { TextField,Card, CardHeader, CardText, RaisedButton } from 'material-ui';
import { FormEvent } from 'react';

export class Register extends React.Component<{}>{
    constructor(props: {}) {
        super(props);
        this.state = {
            message: "Enter your username and password to login",
            username: "",
            password: ""
        };
    }
    public render() {
        return (
            <div>                
                <h2>Sign up</h2>
                <form>
                    <TextField
                        hintText="Username"
                        floatingLabelText="Username"
                        fullWidth
                    />
                    <br/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type = "password"
                        fullWidth
                    />
                    <br/>
                    <TextField
                        hintText="First name"
                        floatingLabelText="First name"
                        fullWidth
                    />
                    <br/>
                    <TextField
                        hintText="Last name"
                        floatingLabelText="Last name"
                        fullWidth
                    />
                    <br/>
                    <br/>
                    <RaisedButton
                        label="Sign up"
                        primary={true}
                        type="submit"
                    />
                </form>
            </div>
        );
    }
}