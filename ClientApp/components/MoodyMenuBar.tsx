import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, FlatButton, TextField, RaisedButton, IconButton, FontIcon, Dialog } from 'material-ui';
import {white, red100, transparent} from 'material-ui/styles/colors';
import { Login } from './Login';
import {Register} from './Register';
import {SongsList} from './Songs/SongsList';


const navStyle = {
    backgroundColor:transparent
}

interface Ihome {
    openLogin:boolean,
    openRegis: boolean,
    user: string
}

interface passedProp extends React.Props<any>{
    LoginSuccess:any
}

export class MoodyMenuBar extends React.Component<{},Ihome & passedProp> {
    constructor(props:any){
        super(props);
        this.state={
            openLogin:false,
            openRegis:false,
            user:"login",
            LoginSuccess:function(){}
        };
    }
      loginOpen = () => {
        this.setState({openLogin: true});
      };
    
      loginClose = () => {
        this.setState({openLogin: false});
      };
      
      registerOpen = () => {
        this.setState({openRegis: true});
      };
    
      registerClose = () => {
        this.setState({openRegis: false});
      };

      getUsername(username: string) {
          this.setState({
              user:username,
          })
      }

    public render(){
        
        return (
            <Toolbar style={navStyle}>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton label='Moody' primary={true} containerElement={<Link to="/"></Link>}/>
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
                        containerElement={<Link to="/songs"/>}
                        primary={true}
                    />
                    <RaisedButton 
                        className = 'nav-items' 
                        label='Playlists'
                        primary={true}
                    />
                </ToolbarGroup>
                <ToolbarGroup>
                    <IconButton tooltip={this.state.user} iconClassName="material-icons menu-icon" onClick={this.loginOpen}>
                        person
                        <Dialog
                            modal={false}
                            open={this.state.openLogin}
                            onRequestClose = {this.loginClose}
                            className='login-dialog'
                        >
                            
                            <Login closeLoginForm={this.loginClose} getUserName = {this.getUsername.bind(this)}/>
                        </Dialog>
                    </IconButton>
                    <IconButton tooltip="sign up" iconClassName="material-icons menu-icon" onClick={this.registerOpen}>
                        personadd
                        <Dialog
                            modal={true}
                            open = {this.state.openRegis}
                            onRequestClose={this.registerClose}
                        >
                            <Register />
                        </Dialog>
                    </IconButton>                   
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
