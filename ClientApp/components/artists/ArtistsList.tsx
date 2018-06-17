import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, CardActions, RaisedButton, CardHeader } from 'material-ui';
import { blueGrey100, white } from 'material-ui/styles/colors';

interface artistInterface {
    artists: Array<any>,
    loading:boolean
}
const style = {
    card: {
        opacity: 0.85,
        marginTop:'0.5vh'
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
        backgroundImage: 'URL("/img/ArtistBackground.jpg")',
        minHeight:'92.5vh'
    },
    noResult: {
        width:"50%",
        marginTop: "30vh",
        opacity:0.8
    }
};


export class ArtistsList extends React.Component<RouteComponentProps<{}>, artistInterface>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { artists: [], loading:true }
        fetch('api/artist/all')
        .then(res => res.json() as Promise<any>)
        .then(data => {
            this.setState({
                artists:data,
                loading:false
            })
        })
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
            if(this.state.artists.length > 0)
            {
                return (
                    <div className='bakcground-img-style sections' style={style.background}>
                        <div className='col-12'>
                            <div className='container'>
                                <div className='row'>
                                    {this.state.artists.map((artist:any,index:number)=>
                                        <div className='col-10 col-sm-8 col-md-7 col-lg-4' key={index}>
                                            <Card style={style.card}>
                                                <CardHeader title="Test with sample data json" />
                                                <CardMedia
                                                    overlay={<CardTitle style={style.title} title={`${artist.firstName} ${artist.lastName}`} />}
                                                >
                                                    <div style={style.cover}>Cover</div>
                                                </CardMedia>
                                                <CardText style={style.description}>
                                                    Date of birth: {artist.birthdate}<br />
                                                    Band: <a>Band</a>

                                                </CardText>
                                                <CardActions>
                                                    <RaisedButton 
                                                        label='Read more'
                                                        containerElement={
                                                            <Link to={`/artist/${artist.artistCode}`}></Link>
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
        }
        
    }
}