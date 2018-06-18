import * as React from 'react';
import { Link, NavLink, Redirect,BrowserRouter } from 'react-router-dom';
import { Toolbar, ToolbarGroup, FlatButton, TextField, RaisedButton, IconButton, FontIcon, Dialog } from 'material-ui';
import {white, red100, transparent, pink100} from 'material-ui/styles/colors';
import { Login } from '../Login';
import {Register} from '../Register';
import { Logout } from '../logout';
import { MenuItem } from './menu-item';
import { DropdownMenu } from './dropdownmenu';

const navStyle = {
    backgroundColor:transparent
}

interface Ihome {
    openLogin:boolean,
    openRegis: boolean,
    user: any,
    searchValue:string,
    isRedirect:boolean,
    isLogin:boolean,
    tooltip:string
}

export class MoodyMenuBar extends React.Component<{},Ihome> {
    constructor(props:any){
        super(props);
        this.state={
            openLogin:false,
            openRegis:false,
            user:{},
            tooltip:"login",
            searchValue:"",
            isRedirect:false,
            isLogin:false,
        };
        // fetch('api/member/current')
        // .then(res => res.json() as Promise<any>)
        // .then(data => {
        //     if(data !=null ){
        //         this.setState({
        //             user:data,
        //             tooltip:data.userId
        //         })
        //     }
        // })
    }

    private search(event: React.FormEvent<HTMLFormElement>){
        if(this.state.searchValue.length >0){
            this.setState({isRedirect:true});
        }
        setTimeout(() => this.setState({isRedirect:false}), 1000);
        
        event.preventDefault();
        return false;
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

    

    public render(){
        return (
            <Toolbar style={navStyle}>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton className="menu-brand" label='Moody' primary={true} containerElement={<Link to="/"></Link>}/>
                </ToolbarGroup>
                {/*search box*/}
                <form onSubmit={(e) => this.search(e)}>
                    <ToolbarGroup className='searchBar'>                    
                        <TextField
                            hintText='Search'
                            className='SearchField'
                            id="searchValue"
                            value={this.state.searchValue}
                            onChange={(e,v) => this.setState({
                                searchValue: v,
                                isRedirect: false
                            })}
                        />
                        <FlatButton 
                            label='Search' 
                            type="submit"
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
                        tooltip={this.state.tooltip} 
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
                    {this.state.tooltip == "login" && 
                        <IconButton tooltip="sign up" iconClassName="material-icons menu-icon" onClick={this.registerOpen}>
                            person_add
                            <Dialog
                                modal={false}
                                open = {this.state.openRegis}
                                onRequestClose={this.registerClose}
                            >
                                <Register 
                                    close={this.registerClose} />
                            </Dialog>
                        </IconButton>
                    } 
                    {this.state.tooltip!="login" && 
                        <Logout />
                    }                 
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
