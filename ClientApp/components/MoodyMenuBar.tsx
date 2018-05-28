import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, FlatButton, TextField, RaisedButton } from 'material-ui';
import {white} from 'material-ui/styles/colors';

const style = {
    backgroundColor:white
}

export class MoodyMenuBar extends React.Component<{}, {}> {
    public render(){
        return (
            <Toolbar style={style}>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton label='Moody' primary={true}/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <TextField
                        hintText='Search'
                    />
                    <RaisedButton label='Search'/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <RaisedButton label='Login' secondary={true}/>
                    <RaisedButton label='Sign in' primary={true}/>
                </ToolbarGroup>
                
            </Toolbar>
        );
    }
}
