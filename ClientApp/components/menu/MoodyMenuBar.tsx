import * as React from 'react';
import { Link, NavLink, Redirect, BrowserRouter } from 'react-router-dom';
import { Toolbar, ToolbarGroup, FlatButton, TextField, RaisedButton, IconButton, FontIcon, Dialog } from 'material-ui';
import { white, red100, transparent, pink100 } from 'material-ui/styles/colors';
import { Login } from '../Login';
import { Register } from '../Register';
import { Logout } from '../logout';
import { MenuItem } from './menu-item';
import { DropdownMenu } from './dropdownmenu';
import { RegisLogoutGroup } from '../RegisLogoutGroup';

const navStyle = {
    backgroundColor: transparent
}

interface Ihome {
    openLogin: boolean,
    openRegis: boolean,
    searchValue: string,
    isRedirect: boolean,
    isLogin: boolean,
    tooltip: string,
    logout:boolean,
}

export class MoodyMenuBar extends React.Component<{}, Ihome> {
    constructor(props: any) {
        super(props);
        this.state = {
            openLogin: false,
            openRegis: false,
            tooltip: "login",
            searchValue: "",
            isRedirect: false,
            isLogin: false,
            logout: false,
        };
        fetch('api/member/current',{
            credentials: "same-origin"
        })
        .then(response => response.json() as Promise<any>)
        .then(data => {            
            this.setState({isLogin:true,tooltip:data.username})
        })
        .catch(error => {
            console.log("error");
        })
    }

    private search(event: React.FormEvent<HTMLFormElement>) {
        if (this.state.searchValue.length > 0) {
            this.setState({ isRedirect: true });
        }
        setTimeout(() => this.setState({ isRedirect: false }), 1000);

        event.preventDefault();
        return false;
    }

    loginOpen = () => {
        this.setState({ openLogin: true });
    };

    loginClose = () => {
        this.setState({ openLogin: false });
    };

    registerOpen = () => {
        this.setState({ openRegis: true });
    };

    registerClose = () => {
        this.setState({ openRegis: false });
    };

    getUsername(username: string) {
        this.setState({
            tooltip: username,
        })
    }

    checkLogin(login: boolean) {
        this.setState({
            isLogin: login
        })
    }

    logout(){
        this.setState({
            isLogin:false,
            tooltip:"login"
        });
    }

    public render() {
        return (
            <Toolbar style={navStyle}>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton className="menu-brand" label='Moody' primary={true} containerElement={<Link to="/"></Link>} />
                </ToolbarGroup>
                {/*search box*/}
                <form onSubmit={(e) => this.search(e)}>
                    <ToolbarGroup className='searchBar'>
                        <TextField
                            hintText='Search'
                            className='SearchField'
                            id="searchValue"
                            value={this.state.searchValue}
                            onChange={(e, v) => this.setState({
                                searchValue: v,
                                isRedirect: false
                            })}
                        />
                        <FlatButton
                            label='Search'
                            type="submit"
                        />

                    </ToolbarGroup>
                    {this.state.isRedirect == true && <Redirect to={`/songs/${this.state.searchValue}`} push />}

                </form>
                {/*drop down menu will be displayed at 1140px*/}
                <ToolbarGroup>
                    <DropdownMenu  isLogin={this.state.isLogin}/>
                </ToolbarGroup>
                {/*normal menu items will be hidden at 1140px*/}
                <ToolbarGroup>
                    <MenuItem isLogin={this.state.isLogin}/>                    
                </ToolbarGroup>
                <ToolbarGroup>
                    {
                        this.state.isLogin == false &&
                        <div>
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
                                    onRequestClose={this.loginClose}
                                    className='login-dialog'
                                >
                                    <Login
                                        closeLoginForm={this.loginClose}
                                        getUserName={this.getUsername.bind(this)}
                                        checkLogin={this.checkLogin.bind(this)}
                                    />
                                </Dialog>
                            </IconButton>
                        </div>
                    }
                    {
                        this.state.isLogin == true &&
                        <div>
                            <IconButton
                                tooltip={this.state.tooltip}
                                iconClassName="material-icons menu-icon"
                                containerElement={<Link to="/user"/>}
                            >
                                portrait
                            </IconButton>
                        </div>
                    }


                    {/*sign up button*/}
                    {this.state.isLogin == false &&
                        <IconButton tooltip="sign up" iconClassName="material-icons menu-icon" onClick={this.registerOpen}>
                            person_add
                            <Dialog
                                modal={false}
                                open={this.state.openRegis}
                                onRequestClose={this.registerClose}
                            >
                                <Register
                                    close={this.registerClose} />
                            </Dialog>
                        </IconButton>
                    }
                    {this.state.isLogin == true &&
                        <Logout Logout={this.logout.bind(this)}/>
                    }
                    
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
