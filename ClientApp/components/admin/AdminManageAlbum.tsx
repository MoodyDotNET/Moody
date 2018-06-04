import * as React from "react";
import { TextField, FlatButton, RaisedButton } from "material-ui";

export class AdminManageAlbum extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props)
    }

    public render() {
        return (
            <div>
                <div>
                    <h2>Manage Album</h2>
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