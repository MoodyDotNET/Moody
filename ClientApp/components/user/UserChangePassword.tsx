import * as React from "react";
import { TextField, FlatButton, RaisedButton } from "material-ui";
import Member from "../../model/Member";

interface UserChangePasswordProp {
    user: Member,
    logout: Function
}

interface UserChangePasswordState {
    user: Member,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    message: string,
    color: string
}

export class UserChangePassword extends React.Component<UserChangePasswordProp, UserChangePasswordState> {
    constructor(props: UserChangePasswordProp) {
        super(props);
        this.state = {
            user: this.props.user,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            message: '',
            color: ''
        }
    }

    private changePassword(e: React.MouseEvent<{}>) {
        if (this.state.oldPassword != this.props.user.password) {
            this.setState({message: 'Old password not correct', color: '#D32F2F'})
            return;
        }
        if (this.state.newPassword.trim() == '') {
            this.setState({message: 'New password must not be null', color: '#D32F2F'})
            return;
        }
        if (this.state.newPassword != this.state.confirmPassword) {
            this.setState({message: 'Password confirming not match', color: '#D32F2F'})
            return;
        }
        var newUser : Member = {
            ...this.state.user,
            password: this.state.newPassword
        }
        console.log(newUser)
        fetch('/api/member/update', {
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
        this.setState({message: 'Password changed', color: '#33691E'})
        this.props.logout();
    }

    public render() {
        return (
            <div>
                <div>
                    <h2>Change password</h2>
                </div>
                <div>
                    <TextField type="password" style={{display: 'block'}} hintText="Old password" value={this.state.oldPassword} onChange={(e, v) => this.setState({oldPassword: v})}/>
                    <TextField type="password" style={{display: 'block'}} hintText="New password" value={this.state.newPassword} onChange={(e, v) => this.setState({newPassword: v})}/>
                    <TextField type="password" style={{display: 'block'}} hintText="Confirm password" value={this.state.confirmPassword} onChange={(e, v) => this.setState({confirmPassword: v})}/>
                    <RaisedButton label="Change password" onClick={(e) => this.changePassword(e)}/>
                    <p style={{color: this.state.color}}>{this.state.message}</p>
                </div>
            </div>
        );
    }
}