import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Paper } from 'material-ui';

export class MoodyHomeBody extends React.Component<RouteComponentProps<{}>,{}> {
    public render(){
        return(
            /*<div className='container'>
                
            </div>*/
            <div className='row home'> 
                <div className='col-12 section1'>
                    <div className='row justify-content-center'>
                        <div className='background'></div>
                        <h1 className='section1_title'>Everything is better<br/>with music</h1>
                    </div>
                </div>
                    
                <div className='col-12 section2 sections'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-xs-10 col-sm-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xs-10 col-sm-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                                
                            <div className='col-xs-10 col-sm-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xs-10 col-sm-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xs-10 col-sm-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                                
                            <div className='col-xs-10 col-sm-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='link'>
                            <NavLink to={'/home'}><p>More songs</p></NavLink>
                        </div>
                    </div>
                </div>

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
            </div>

        );
    }
}