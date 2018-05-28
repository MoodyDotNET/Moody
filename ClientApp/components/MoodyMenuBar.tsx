import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, FlatButton, TextField, RaisedButton, IconButton, FontIcon, Dialog } from 'material-ui';
import {white, red100, transparent} from 'material-ui/styles/colors';
import { Login } from './Login';

const navStyle = {
    backgroundColor:white
}

export class MoodyMenuBar extends React.Component<{}, {}> {
    state = {
        open: false,
      };
    
      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
      
    public render(){
        
        return (
            <Toolbar style={navStyle}>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton label='Moody' primary={true}/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <TextField
                        hintText='Search'
                        className='SearchField'
                    />
                    <RaisedButton label='Search'/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <RaisedButton 
                        className = 'nav-items' 
                        label='Home'
                        containerElement={<Link to="/"></Link>}
                        secondary={true}
                    />
                    <RaisedButton 
                        className = 'nav-items' 
                        label='Albums'
                        primary={true}
                    />                    
                    <RaisedButton 
                        className = 'nav-items' 
                        label='Artists'
                        primary={true}
                    />
                    <RaisedButton 
                        className = 'nav-items' 
                        label='Songs'
                        primary={true}
                    />
                </ToolbarGroup>
                <ToolbarGroup>
                    <IconButton tooltip="login" iconClassName="material-icons" onClick={this.handleOpen}>
                        person
                        <Dialog
                            modal={false}
                            open={this.state.open}
                            onRequestClose = {this.handleClose}
                            className='login-dialog'
                        >
                            <Login />
                        </Dialog>
                    </IconButton>
                    <IconButton tooltip="sign up" iconClassName="material-icons">
                        personadd
                    </IconButton>                   
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
