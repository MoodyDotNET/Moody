import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';
import { Link, NavLink, Redirect } from 'react-router-dom';
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
    user: string,
    searchValue:string,
    searchResult:Array<any>,
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
            searchValue:"",
            searchResult:[],
            LoginSuccess:function(){}
        };
    }

    private search(event: React.FormEvent<HTMLFormElement>){
        fetch(`api/playMusic/listSong?searchField=a`)
        // fetch(`api/playMusic/listSong?searchField=${this.state.searchValue}`)
        .then(response => response.json() as Promise<any>)
        .then(data => {
            console.log(data);
            this.setState({searchResult:data})
            // if(data == null) {
            //     console.log("null data")
            // }
            // else {
            //     console.log(data);
            //     this.setState({searchResult:true})
            // }
        })
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
                {/* {this.state.searchResult.indexOf("test") >=0 && <Redirect to="/songs" push/>} */}
                <form onSubmit={(e) => this.search(e)}>
                    <ToolbarGroup>                    
                        <TextField
                            hintText='Search'
                            className='SearchField'
                            value={this.state.searchValue}
                            onChange={(e,v) => this.setState({searchValue: v})}
                        />
                        <RaisedButton label='Search' type="submit"/>
                            {/* {this.state.searchResult == true && <Redirect to="/songs" push/>} */}                    
                    </ToolbarGroup>
                </form>
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
