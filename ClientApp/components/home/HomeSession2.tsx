import * as React from 'react';
import {NavLink} from 'react-router-dom';

export class HomeSession2 extends React.Component<{},{}>{
    public render(){
        return (
            <div className='col-12 section2 sections'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-sm-6 col-md-5 col-lg-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6 col-md-5 col-lg-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                                
                            <div className='col-sm-6 col-md-5 col-lg-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6 col-md-5 col-lg-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm-6 col-md-5 col-lg-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                                
                            <div className='col-sm-6 col-md-5 col-lg-4 card'>
                                <div className="song-wrapper">
                                    <div className='song-script'>
                                        <span className='song-name'>Song name</span><br/>
                                        <span className='song-artist'>Arttist</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <NavLink to={`/songs/''`}><p className='link'>More songs</p></NavLink>
                        </div>
                    </div>
                </div>

        );
    }
}