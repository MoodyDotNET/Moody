import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, CardActions, RaisedButton, CardHeader } from 'material-ui';
import { blueGrey100, white } from 'material-ui/styles/colors';

interface songInterface {
    songs:Array<any>
}

    
const style={
    card:{
        opacity:0.8,
    },
    title:{
        height:'7vh',
        padding:'0px 16px',
    },
    cover:{
        textAlign:'center',
        height:'30vh',
        backgroundColor:blueGrey100,
        color:white,
    },
    description: {
        height:'10vh'
    }
};


export class SongsList extends React.Component<RouteComponentProps<{}>,songInterface>{
    // http://localhost:5000/api/playMusic?searchField=a
    constructor(props: RouteComponentProps<{}>){ 
        super(props);
        this.state={ songs:[], }
        fetch('api/playMusic/getsong?searchField=a')
        .then(response => response.json())
        .then(data=>{
            this.setState({ songs:data });
        })

    }
 
    public render(){
        return (
            <div className='row songs-list sections'>
                <div className='col-12'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-10 col-sm-8 col-md-7 col-lg-4'>
                                <Card style={style.card}>
                                    <CardHeader title="Prototype"/>
                                    <CardMedia
                                        overlay={<CardTitle style={style.title} title='Song title'/>}
                                    >
                                        <div style={style.cover}>Cover</div>
                                    </CardMedia>
                                    <CardText style={style.description}>
                                        By: artist<br/>
                                        Date released: date<br/>
                                        Album: <a>album name</a>
                                    </CardText>
                                    <CardActions>
                                        <RaisedButton label='Hear it' primary={true}/>
                                    </CardActions>
                                </Card>
                            </div>
                            {this.state.songs.map((song:any,index:number)=>
                                <div className='col-10 col-sm-8 col-md-7 col-lg-4' key={index}>
                                    <Card style={style.card}>
                                        <CardHeader title="Test with sample data json"/>
                                        <CardMedia
                                            overlay={<CardTitle style={style.title} title={song.title}/>}
                                        >
                                            <div style={style.cover}>{song.cover}Cover</div>
                                        </CardMedia>
                                        <CardText style={style.description}>
                                            By: artist<br/>
                                            Date released: date<br/>
                                            Album: <a>album name</a>
                                        </CardText>
                                        <CardActions>
                                            <RaisedButton label='Hear it' primary={true}/>
                                        </CardActions>
                                    </Card>
                                </div>                                
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}