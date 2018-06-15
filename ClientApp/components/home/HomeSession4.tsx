import * as React from 'react';
import {NavLink} from 'react-router-dom';

const style={
    background:{
        backgroundImage:'URL("/img/music-is-life.jpg")',
    }
}

export class HomeSession4 extends React.Component<{},{}>{
    public render(){
        return (
            <div className='col-12 section4 sections' style={style.background}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-5 col-md-6 col-sm-8 col-10'>
                            <div className='artist-img-big'></div>
                        </div>
                        <div className='col-lg-7 col-md-6 col-sm-8 col-10'>
                            <div className='row'>
                                <div className='col-lg-4 col-md-6 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                                <div className='col-lg-4 col-md-6 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                                <div className='col-lg-4 col-md-6 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-4 col-md-6 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                                <div className='col-lg-4 col-md-6 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                                <div className='col-lg-4 col-md-6 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div>
                        <NavLink to={'/artists'}><p className='link'>More artists</p></NavLink>
                    </div>
                </div>
            </div>
        );
    }
}