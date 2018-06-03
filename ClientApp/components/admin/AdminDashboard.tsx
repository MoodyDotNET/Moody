import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Paper, Card, List, ListItem, CardActions, RaisedButton, Avatar, Divider, CircularProgress } from 'material-ui';
import { AdminChangePassword } from './AdminChangePassword';
import { AdminManageAccount } from './AdminManageAccount';
import Administrator from '../../model/Administrator';

interface AdminDashboardState {
    admin: Administrator[],
    activeTab: string,
    logged: boolean,
    loading: boolean
}

export class AdminDashboard extends React.Component<RouteComponentProps<{}>, AdminDashboardState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            admin: [],
            activeTab: 'manage',
            logged: true,
            loading: true
        }
        this.fetchCurrentUser();
    }

    private fetchCurrentUser() {
        fetch('api/admin/current', {
            credentials: "same-origin"
        })
        .then(response => response.json() as Promise<Administrator>)
        .then(data => {
            this.setState({
                admin: [data],
                loading: false
            });
        })
        .catch(error => {
            this.setState({
                logged: false
            })
        });
    }

    private logout() {
        fetch('api/admin/logout', {
            credentials: "same-origin"
        }).then(res => {
            this.setState({
                logged: false
            })
        });
    }

    public render() {
        return (
            <Paper>
                <div className="container-fluid" style={{ backgroundColor: 'white', paddingTop: 80, minHeight: '100vh' }}>
                    { !this.state.logged && <Redirect to="/admin/login" push/> }
                    { this.state.loading ? <CircularProgress /> : this.renderDashboard(this.state.admin[0]) }
                </div>
            </Paper>
        );
    }

    private renderPanel() {
        switch (this.state.activeTab) {
            case 'manage':
                return <AdminManageAccount/>
        
            case 'password':
                return <AdminChangePassword/>
        }
    }

    private renderDashboard(admin: Administrator) {
        return (
            <div className="row">
                <div className="col-12 col-md-3">
                    <List>
                        <ListItem 
                            leftAvatar={ <Avatar src="material.png" /> }
                            nestedItems={[
                                <Divider/>,
                                <ListItem onClick={ () => this.setState({activeTab: 'manage'}) }>Manage account</ListItem>,
                                <ListItem onClick={ () => this.setState({activeTab: 'password'}) }>Change password</ListItem>,
                                <ListItem onClick={ () => this.logout() }>Log Out</ListItem>
                            ]}
                            initiallyOpen
                        >
                            { admin.username }
                        </ListItem>
                    </List>
                </div>
                <div className="col-12 col-md-9">
                    { this.renderPanel() }
                </div>
            </div>
        );
    }
}
