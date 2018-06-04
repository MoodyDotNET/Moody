import * as React from 'react';
import {NavLink} from 'react-router-dom';

const style={
    background:{
        backgroundImage:'URL("/img/3-seamless-icon-pattern-download.jpg")',
    }
}

export class HomeSession4 extends React.Component<{},{}>{
    public render(){
        return (
            <div className='col-12 section4 sections' style={style.background}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <div className='artist-img-big'></div>
                        </div>
                        <div className='col-md-7'>
                            <div className='row'>
                                <div className='col-md-4 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                                <div className='col-md-4 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                                <div className='col-md-4 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                                <div className='col-md-4 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                                <div className='col-md-4 no-padding-left'>
                                    <div className='artist-img-small'></div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div>
                        <NavLink to={'/home'}><p className='link'>More artists</p></NavLink>
                    </div>
                </div>
            </div>
        );
    }
}