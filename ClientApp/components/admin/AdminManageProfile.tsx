import * as React from "react";
import { TextField, RaisedButton, Avatar, FlatButton } from "material-ui";
import Administrator from "../../model/Administrator";

interface Props {
    admin: Administrator;
}

export class AdminManageProfile extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props)
    }

    public render() {
        return (
            <div>
                <div>
                    <h2>{ this.props.admin.firstName ? this.props.admin.firstName : this.props.admin.username }'s profile</h2>
                </div>
                <div>
                    <Avatar src="material.png" size={140} style={{display: 'block', marginBottom: 10}}/>
                    <RaisedButton
                        containerElement='label'
                        label='Upload avatar'>
                        <input type="file" style={{display: 'none'}}/>
                    </RaisedButton>
                </div>
                <div>
                    <TextField hintText={this.props.admin.firstName ? this.props.admin.firstName : "Firstname"}/>
                    <TextField hintText={this.props.admin.miidleName ? this.props.admin.miidleName : "Middlename"}/>
                    <TextField hintText={this.props.admin.lastName ? this.props.admin.lastName: "Lastname"}/>
                </div>
                <div>
                    <RaisedButton label="Update my profile"></RaisedButton>
                </div>
            </div>
        );
    }
}