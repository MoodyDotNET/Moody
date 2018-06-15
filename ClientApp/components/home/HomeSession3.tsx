import * as React from 'react';
import {NavLink} from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, CardActions, RaisedButton } from 'material-ui';

export class HomeSession3 extends React.Component<{},{}>{
    public render(){
        return (
            <div className='col-12 section3 sections'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-10 col-sm-8 col-md-7 col-lg-4 album-wrapper'>
                            <Card>
                                <CardMedia
                                    overlay={<CardTitle title='album title'/>}
                                >
                                    <img className="album-cover" src="/img/sampleBackground.jpg"/>
                                </CardMedia>
                                <CardText className='album-script'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>
                                <CardActions>
                                    <RaisedButton label='Hear it' primary={true}/>
                                </CardActions>
                            </Card>
                        </div>

                        <div className='col-10 col-sm-8 col-md-7 col-lg-4 album-wrapper'>
                            <Card>
                                <CardMedia
                                    overlay={<CardTitle title='album title'/>}
                                >
                                    <img className="album-cover" src="/img/sampleBackground.jpg"/>
                                </CardMedia>
                                <CardText className='album-script'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>
                                <CardActions>
                                    <RaisedButton label='Hear it' primary={true}/>
                                </CardActions>
                            </Card>
                        </div>

                        <div className='col-10 col-sm-8 col-md-7 col-lg-4 album-wrapper'>
                            <Card>
                                <CardMedia
                                    overlay={<CardTitle title='album title'/>}
                                >
                                    <img className="album-cover" src="/img/sampleBackground.jpg"/>
                                </CardMedia>
                                <CardText className='album-script'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>
                                <CardActions>
                                    <RaisedButton label='Hear it' primary={true}/>
                                </CardActions>
                            </Card>
                        </div>
                        
                    </div>
                    <div>
                        <NavLink to={'/albums'}><p className='link'>More albums</p></NavLink>
                    </div>
                </div>
            </div>
        );
    }
}