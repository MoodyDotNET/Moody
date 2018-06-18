import * as React from 'react';
import { RaisedButton,FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';

export class MenuItem extends React.Component<{}>{
    public render(){
        return (
            <div className="menu-item-bg">
                <FlatButton 
                        className = 'nav-items' 
                        label='Home'
                        containerElement={<Link to="/"></Link>}
                        
                    />
                    <FlatButton 
                        className = 'nav-items' 
                        label='Albums'
                        containerElement={<Link to="/albums"></Link>}
                        
                    />                    
                    <FlatButton 
                        className = 'nav-items' 
                        label='Artists'
                        containerElement={<Link to="/artists"></Link>}
                        
                    />
                    <FlatButton 
                        className = 'nav-items' 
                        label='Songs'
                        containerElement={<Link to="/songs/all"></Link>}
                        
                    />
                    <FlatButton 
                        className = 'nav-items' 
                        label='Playlists'
                        containerElement={<Link to="/"></Link>}
                        
                    />
            </div>
        );
    }
}