import * as React from "react";
import { TextField, FlatButton, RaisedButton } from "material-ui";

export class AdminChangePassword extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props)
    }

    public render() {
        return (
            <div>
                <div>
                    <h2>Change password</h2>
                </div>
                <div>
                    <TextField type="password" style={{display: 'block'}} hintText="Old password"/>
                    <TextField type="password" style={{display: 'block'}} hintText="New password"/>
                    <TextField type="password" style={{display: 'block'}} hintText="Confirm password"/>
                    <RaisedButton label="Change password" />
                </div>
            </div>
        );
    }
}