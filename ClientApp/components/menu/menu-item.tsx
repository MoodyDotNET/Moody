import * as React from 'react';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router-dom';

export class MenuItem extends React.Component<{}>{
    public render(){
        return (
            <div className="menu-item-bg">
                <RaisedButton 
                        className = 'nav-items' 
                        label='Home'
                        containerElement={<Link to="/"></Link>}
                        secondary={true}
                    />
                    <RaisedButton 
                        className = 'nav-items' 
                        label='Albums'
                        containerElement={<Link to="/albums"></Link>}
                        primary={true}
                    />                    
                    <RaisedButton 
                        className = 'nav-items' 
                        label='Artists'
                        containerElement={<Link to="/artists"></Link>}
                        primary={true}
                    />
                    <RaisedButton 
                        className = 'nav-items' 
                        label='Songs'
                        containerElement={<Link to="/songs/''"></Link>}
                        primary={true}
                    />
                    <RaisedButton 
                        className = 'nav-items' 
                        label='Playlists'
                        primary={true}
                    />
            </div>
        );
    }
}