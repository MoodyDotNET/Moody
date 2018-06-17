import * as React from "react";
import { TextField, FlatButton, RaisedButton } from "material-ui";
import Administrator from "../../model/Administrator";

interface AdminManagePasswordProp {
    admin: Administrator,
    logout: Function
}

interface AdminManagePasswordState {
    admin: Administrator,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    message: string,
    color: string
}

export class AdminManagePassword extends React.Component<AdminManagePasswordProp, AdminManagePasswordState> {
    constructor(props: AdminManagePasswordProp) {
        super(props);
        this.state = {
            admin: this.props.admin,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            message: '',
            color: ''
        }
    }

    private changePassword(e: React.MouseEvent<{}>) {
        if (this.state.oldPassword != this.props.admin.password) {
            this.setState({message: 'Old password not correct', color: '#D32F2F'})
            return;
        }
        if (this.state.newPassword != this.state.confirmPassword) {
            this.setState({message: 'Password confirming not match', color: '#D32F2F'})
            return;
        }
        var newUser : Administrator = {
            ...this.state.admin,
            password: this.state.newPassword
        }
        console.log(newUser)
        fetch('/api/admin/update', {
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