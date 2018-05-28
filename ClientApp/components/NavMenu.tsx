import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { List, ListItem, Paper } from 'material-ui';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="NavMenu">
                <Paper>
                    <List>
                        <ListItem primaryText="Home" secondaryText="An introducing" containerElement={
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        }>
                        </ListItem>
                        <ListItem primaryText="Counter" secondaryText="Simulating how react does the job" containerElement={
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        }>
                        </ListItem>
                        <ListItem primaryText="Fetch data" secondaryText="An ajax example" containerElement={
                            <NavLink to={ '/fetchdata' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        }>
                        </ListItem>
                        <ListItem primaryText="Moody Home Page" secondaryText="test" containerElement={
                            <NavLink to={ '/homeBody' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> home page
                            </NavLink>
                        }>
                        </ListItem>
                    </List>
                </Paper>
            </div>
        );
    }
}
