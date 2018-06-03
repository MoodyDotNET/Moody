import * as React from "react";
import { TextField, RaisedButton, Avatar, FlatButton } from "material-ui";

export class AdminManageAccount extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props)
    }

    public render() {
        return (
            <div>
                <div>
                    <h2>Manage account</h2>
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
                    <TextField hintText="First name"/>
                    <TextField hintText="Middle name"/>
                    <TextField hintText="Last name"/>
                </div>
                <div>
                    <RaisedButton label="Update my profile"></RaisedButton>
                </div>
            </div>
        );
    }
}