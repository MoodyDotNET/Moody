import * as React from 'react';
import { Link, NavLink, Redirect, RouteComponentProps } from 'react-router-dom';
import { TextField,Card, CardHeader, CardText, RaisedButton } from 'material-ui';
import { FormEvent } from 'react';
import Member from '../model/Member';

interface RegisterState {
    message: string;
    username: string;
    password: string;
    confirm: string;
    color: string
}

export class Register extends React.Component<any, RegisterState>{
    constructor(props: any) {
        super(props);
        this.state = {
            message: "Enter your username and password to login",
            username: "",
            password: "",
            confirm: "",
            color: ""
        };
    }

    private insert(e: React.FormEvent<{}>) {
        e.preventDefault();
        if (this.state.username == '' || this.state.password == '') {
            return false;
        }
        if (this.state.password != this.state.confirm) {
            this.setState({
                message: 'Password confirm not match!',
                color: '#D32F2F'
            })
            return false;
        }
        var member : Member = {
            username: this.state.username,
            password: this.state.password,
            firstName: '',
            lastName: '',
            middleName: '',
            userId: 0
        }
        fetch('/api/member/insert', {
            method: 'POST',
            body: JSON.stringify(member),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json() as Promise<boolean>)
            .then(data => {
                console.log(data)
                if (data == true) {
                    this.setState({
                        message: 'User registered successfully!',
                        color: '#33691E'
                    })
                } else {
                    this.setState({
                        message: 'Username existed! Try another',
                        color: '#D32F2F'
                    })
                }
            })
            .catch(error => console.error('Error:', error))
        return false;
    }

    public render() {
        return (
            <div>                
                <h2>Sign up</h2>
                <p style={{color: this.state.color}}>
                    {this.state.message} 
                    { this.state.color == '#33691E' && <Link to={ '/login' } onClick={() => this.props.close()}>Login now</Link>}
                </p>
                <form onSubmit={(e) => this.insert(e)}>
                    <TextField
                        hintText="Username"
                        floatingLabelText="Username"
                        fullWidth
                        value={this.state.username}
                        onChange={(e, v) => this.setState({username: v})}
                    />
                    <br/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type = "password"
                        fullWidth
                        value={this.state.password}
                        onChange={(e, v) => this.setState({password: v})}
                    />
                    <br/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type = "password"
                        fullWidth
                        value={this.state.confirm}
                        onChange={(e, v) => this.setState({confirm: v})}
                    />
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