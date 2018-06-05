import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader } from 'material-ui';
import { blueGrey100, white } from 'material-ui/styles/colors';

const style={
    card:{
        opacity:0.8,
    },
    title:{
        // height:'7vh',
        // padding:'0px 16px',
    },
    cover:{
        textAlign:'center',
        height:'50vh',
        backgroundColor:blueGrey100,
        color:white,
    },
    description: {
        height:'10vh'
    },
    background:{
        backgroundImage:'URL("/img/songBackground.jpg")'
    },
    audio: {
        width:'100%',
        borderRadius: 0,
    }
}
export class Song extends React.Component<RouteComponentProps<{}>,{}>{
    public render(){
        return(
            <div className='songs-list sections' style={style.background}>
                <div className='col-12'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className="col-11 col-sm-8">
                                <Card style={style.card}>
                                    <CardHeader title="Prototype"/>
                                    <CardMedia
                                        overlay={
                                            <audio controls style={style.audio}>
                                                <source src="mp3/Introducing-Me.mp3" type="audio/mpeg"/>
                                            </audio>
                                        }
                                    >
                                        <div style={style.cover}>Cover</div>
                                    </CardMedia>
                                    <CardTitle style={style.title} title='Song title' actAsExpander={true} showExpandableButton={true}/>
                                    <CardText style={style.description} expandable={true}>
                                        By: artist<br/>
                                        Date released: date<br/>
                                        Album: <a>album name</a>
                                    </CardText>
                                    <CardText>
                                        <CardTitle title="lyrics"/>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                                        in culpa qui officia deserunt mollit anim id est laborum.
                                    </CardText>
                                </Card>
                            </div>
                            <div className="col-11 col-sm-4">
                                <Card>
                                    <CardHeader title="Related songs"/>
                                    <CardText>

                                    </CardText>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}