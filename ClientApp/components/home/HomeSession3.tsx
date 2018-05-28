import * as React from 'react';
import {NavLink} from 'react-router-dom';

export class HomeSession3 extends React.Component<{},{}>{
    public render(){
        return (
            <div className='col-12 section3 sections'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='album-cover'>
                            </div>
                        </div>
                        <div className='col-sm-8'>
                            <div className='album-script'>
                            </div>
                        </div>
                    </div>
                    <div className='link'>
                        <NavLink to={'/home'}><p>More albums</p></NavLink>
                    </div>
                </div>
            </div>
        );
    }
}