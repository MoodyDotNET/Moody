import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, CardActions, RaisedButton, CardHeader } from 'material-ui';
import { blueGrey100, white } from 'material-ui/styles/colors';

interface songInterface {
    songs: Array<any>,
    loading:boolean
}


const style = {
    card: {
        opacity: 0.8,
    },
    title: {
        height: '7vh',
        padding: '0px 16px',
    },
    cover: {
        textAlign: 'center',
        height: '30vh',
        backgroundColor: blueGrey100,
        color: white,
    },
    description: {
        height: '10vh'
    },
    background: {
        backgroundImage: 'URL("/img/songBackground.jpg")',
        minHeight:'92.5vh'
    },
    noResult: {
        width:"50%",
        marginTop: "30vh",
        opacity:0.8
    }
};


export class SongsList extends React.Component<RouteComponentProps<{}>, songInterface>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { songs: [], loading:true }
        const search:any = this.props.match.params;
        
        if(search != ''){
            fetch(`api/song/search?searchField=${search.searchResult}`)
            .then(response => response.json() as Promise<any>)
            .then(data => {   
                if(data != null){
                    this.setState({ songs: data,loading:false });
                    console.log(this.state.songs);
                }                           
            })
        }
    }

    public render() {
        if(this.state.loading == true) {
            return (
                <div className='songs-list sections' style={style.background}>
                    <div className='col-12'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <Card style = {style.noResult}>
                                    <CardTitle title="Loading . . ."/>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            if(this.state.songs.length > 0)
            {
                return (
                    <div className='songs-list sections' style={style.background}>
                        <div className='col-12'>
                            <div className='container'>
                                <div className='row'>
                                    {this.state.songs.map((song:any,index:number)=>
                                        <div className='col-10 col-sm-8 col-md-7 col-lg-4' key={index}>
                                            <Card style={style.card}>
                                                <CardHeader title="Test with sample data json" />
                                                <CardMedia
                                                    overlay={<CardTitle style={style.title} title={song.title} />}
                                                >
                                                    <div style={style.cover}>{song.cover}Cover</div>
                                                </CardMedia>
                                                <CardText style={style.description}>
                                                    By: artist<br />
                                                    Date released: date<br />
                                                    Album: <a>album name</a>
                                                </CardText>
                                                <CardActions>
                                                    <RaisedButton 
                                                        label='Hear it'
                                                        containerElement={
                                                            <Link to={`/song/${song.songCode}`}></Link>
                                                        }
                                                        primary={true} 
                                                    />
                                                    <RaisedButton 
                                                        label='Add to play list'
                                                        primary={true} 
                                                    />
                                                </CardActions>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div className='songs-list sections' style={style.background}>
                        <div className='col-12'>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <Card style = {style.noResult}>
                                        <CardTitle title="No result"/>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        
    }
}