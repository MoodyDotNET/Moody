import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';
import { AppBar, FlatButton, Tab, Tabs, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';

export class MoodyMenuBarSM extends React.Component<{}, {}> {
    public render(){
        return (
            <AppBar 
                title='Moody'
                iconElementRight={
                    <Tabs>
                        <Tab className='tag' label='Home'/>
                        <Tab className='tag' label='Albums'/>
                        <Tab className='tag' label='Songs'/>
                        <Tab className='tag' label='About us'/>
                    </Tabs> 
                }
            />
        );
    }
}
