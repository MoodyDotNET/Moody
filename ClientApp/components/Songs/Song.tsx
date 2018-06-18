import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader } from 'material-ui';
import { blueGrey100, white } from 'material-ui/styles/colors';

const style={
    card:{
        opacity:0.85,
    },
    title:{
        height:'7vh',
        padding:'0px 16px',
    },
    cover:{
        height:'50vh',
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
interface Isong {
    songInfo: any,
    mp3FilePath: any,
    
}

export class SongComponent extends React.Component<RouteComponentProps<{}>,Isong>{
    constructor(props: RouteComponentProps<{}>){
        super(props);
        this.state= {
            songInfo: {},
            mp3FilePath:""
        }

        var paramURL:any = this.props.match.params;
        var songId:string = paramURL.songId; 
        fetch(`api/song/get?id=${songId}`)
        .then(response => response.json() as Promise<any>)
        .then(data =>{
            this.setState({
                songInfo:data,
                mp3FilePath:"mp3/"+songId+".mp3"              
            })  
            var aud = this.refs.audio as HTMLAudioElement;
            aud.load();
                      
        })
       
    }
    
    public render(){
        return(
            <div className='bakcground-img-style sections' style={style.background}>
                <div className='col-12'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className="col-11 col-sm-8">
                                <Card style={style.card}>
                                    <CardHeader title="test when calling API"/>
                                    <CardMedia
                                        overlay={
                                            <audio controls style={style.audio} ref="audio">
                                                <source src={this.state.mp3FilePath} type="audio/mpeg"/>
                                            </audio>
                                        }
                                        
                                    >
                                        <img style={style.cover} src={`img/song/${this.state.songInfo.songCode}.jpg`}/>
                                    </CardMedia>
                                    <CardTitle 
                                        style={style.title} 
                                        title={`${this.state.songInfo.title} - ${this.state.songInfo.subtitle}`} 
                                        actAsExpander={true} 
                                        showExpandableButton={true}
                                    />
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