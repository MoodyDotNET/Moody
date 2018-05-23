import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TextField,Card, CardHeader, CardText, RaisedButton } from 'material-ui';

export class Login extends React.Component<{}, {}> {
    public render() {
        return (
            <Card>
                <CardHeader
                    title = "Login"
                />
                <CardText>
                    <TextField
                        hintText="Username"
                        floatingLabelText="Username"
                    />
                    
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type = "password"
                    />
                    <br/>
                    <RaisedButton
                        label="Login"
                        primary={true}
                        type="submit"
                    />
                </CardText>
            </Card>
        );
    }
}
