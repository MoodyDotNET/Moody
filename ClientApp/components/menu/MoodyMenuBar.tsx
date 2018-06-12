import * as React from 'react';
import { Link, NavLink, Redirect,BrowserRouter } from 'react-router-dom';
import { Toolbar, ToolbarGroup, FlatButton, TextField, RaisedButton, IconButton, FontIcon, Dialog } from 'material-ui';
import {white, red100, transparent, pink100} from 'material-ui/styles/colors';
import { Login } from '../Login';
import {Register} from '../Register';
import {SongsList} from '../Songs/SongsList';
import { Logout } from '../logout';
import { MenuItem } from './menu-item';
import { DropdownMenu } from './dropdownmenu';

const navStyle = {
    backgroundColor:transparent
}

interface Ihome {
    openLogin:boolean,
    openRegis: boolean,
    user: string,
    searchValue:string,
    isRedirect:boolean,
    isLogin:boolean
}

export class MoodyMenuBar extends React.Component<{},Ihome> {
    constructor(props:any){
        super(props);
        this.state={
            openLogin:false,
            openRegis:false,
            user:"login",
            searchValue:"",
            isRedirect:false,
            isLogin:false,
        };
    }

    private search(event: React.FormEvent<HTMLFormElement>){
        if(this.state.searchValue.length >0){
            this.setState({isRedirect:true});
            console.log("search1")
        }        
        console.log("search2")
        event.preventDefault();
        //return false;
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

      isLogin(login:boolean){
          this.setState({
              isLogin:login
          })
      }

      resetSearchValue(){
          this.setState({
              searchValue:""
           });
          console.log("reset search value");
      }

    public render(){
        return (
            <Toolbar style={navStyle}>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton className="menu-brand" label='Moody' primary={true} containerElement={<Link to="/"></Link>}/>
                </ToolbarGroup>
                {/*search box*/}
                <form onSubmit={(e) => this.search(e)}>
                    <ToolbarGroup>                    
                        <TextField
                            hintText='Search'
                            className='SearchField'
                            value={this.state.searchValue}
                            onChange={(e,v) => this.setState({searchValue: v})}
                        />
                        <RaisedButton 
                            label='Search' 
                            type="submit"
                            onClick={this.resetSearchValue}                           
                        />
                        
                    </ToolbarGroup>
                    {this.state.isRedirect == true && <Redirect to={`/songs/${this.state.searchValue}`} push/>}
                </form>
                {/*drop down menu will be displayed at 1140px*/}
                <ToolbarGroup>
                    <DropdownMenu />
                </ToolbarGroup>
                {/*normal menu items will be hidden at 1140px*/}
                <ToolbarGroup>
                    <MenuItem />
                </ToolbarGroup>
                <ToolbarGroup>
                    {/*login button*/}
                    <IconButton 
                        tooltip={this.state.user} 
                        iconClassName="material-icons menu-icon" 
                        onClick={this.loginOpen}
                    >
                        account_circle
                        <Dialog
                            modal={false}
                            open={this.state.openLogin}
                            onRequestClose = {this.loginClose}
                            className='login-dialog'
                        >                    
                            <Login 
                                closeLoginForm={this.loginClose} 
                                getUserName = {this.getUsername.bind(this)}
                                checkLogin = {this.isLogin.bind(this)}    
                            />
                        </Dialog>
                    </IconButton>

                    {/*sign up button*/}
                    {this.state.isLogin == false && 
                        <IconButton tooltip="sign up" iconClassName="material-icons menu-icon" onClick={this.registerOpen}>
                            person_add
                            <Dialog
                                modal={true}
                                open = {this.state.openRegis}
                                onRequestClose={this.registerClose}
                            >
                                <Register />
                            </Dialog>
                        </IconButton>
                    } 
                    {this.state.isLogin == true && 
                        <Logout />
                    }                 
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
