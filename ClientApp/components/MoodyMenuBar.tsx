import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';
import {RaisedButton} from 'material-ui/RaisedButton';

export class MoodyMenuBar extends React.Component<{}, {}> {
    public render(){
        return (
            <div className='row navMenu'>
                <div className='col-sm-5 col-md-3 navMenu-title col-md-push-4'>
                    <p>Moody</p>
                </div>
                <div className='col-md-6 search-box'>
                    <p>
                        <input type='text' placeholder='Search . . .'/>
                        <button>Search</button>
                    </p>
                    
                </div>
                <div className='navMenu-item col-md-1'>
                    <p><a>Home</a></p>
                </div>        
                <div className='navMenu-item col-md-1'>
                    <p><a>Albums</a></p>
                </div>
                <div className='navMenu-item col-md-1'>
                    <p><a>Songs</a></p>
                </div>
            </div>
        );
    }
}
