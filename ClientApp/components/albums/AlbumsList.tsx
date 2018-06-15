import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, CardActions, RaisedButton, CardHeader } from 'material-ui';
import { blueGrey100, white } from 'material-ui/styles/colors';

interface albumInterface {
    albums: Array<any>,
    loading:boolean
}
const style = {
    card: {
        opacity: 0.85,
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
        backgroundImage: 'URL("/img/AlbumBackground.jpg")',
        minHeight:'92.5vh'
    },
    noResult: {
        width:"50%",
        marginTop: "30vh",
        opacity:0.8
    }
};


export class AlbumsList extends React.Component<RouteComponentProps<{}>, albumInterface>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { albums: [{code:1,name:"album1",image:""}], loading:false }
        
    }

    public render() {
        if(this.state.loading == true) {
            return (
                <div className='bakcground-img-style sections' style={style.background}>
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
            if(this.state.albums.length > 0)
            {
                return (
                    <div className='songs-list sections' style={style.background}>
                        <div className='col-12'>
                            <div className='container'>
                                <div className='row'>
                                    {this.state.albums.map((album:any,index:number)=>
                                        <div className='col-10 col-sm-8 col-md-7 col-lg-4' key={index}>
                                            <Card style={style.card}>
                                                <CardHeader title="Test with sample data json" />
                                                <CardMedia
                                                    overlay={<CardTitle style={style.title} title={album.title} />}
                                                >
                                                    <div style={style.cover}>{album.cover}Cover</div>
                                                </CardMedia>
                                                <CardText style={style.description}>
                                                    Date released: date<br />
                                                    Description: <a>description</a>
                                                </CardText>
                                                <CardActions>
                                                    <RaisedButton 
                                                        label='Hear it'
                                                        containerElement={
                                                            <Link to={`/album/${album.code}`}></Link>
                                                        }
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