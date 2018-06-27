import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, CardActions, RaisedButton, CardHeader } from 'material-ui';
import { blueGrey100, white } from 'material-ui/styles/colors';

interface artistInterface {
    artists: Array<any>,
    loading: boolean
}
const style = {
    card: {
        opacity: 0.85,
        marginTop: '0.5vh'
    },
    title: {
        height: '7vh',
        padding: '0px 16px',
    },
    cover: {
        height: '30vh',
    },
    description: {
        height: '10vh'
    },
    background: {
        backgroundImage: 'URL("/img/ArtistBackground.jpg")',
        minHeight: '92.5vh'
    },
    noResult: {
        width: "250px",
        marginTop: "30vh",
        opacity: 0.8
    }
};


export class ArtistsList extends React.Component<RouteComponentProps<{}>, artistInterface>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { artists: [], loading: true }
        fetch('api/artist/all')
            .then(res => res.json() as Promise<any>)
            .then(data => {
                this.setState({
                    artists: data,
                    loading: false
                })
            })
    }

    public render() {
        if (this.state.loading == true) {
            return (
                <div className='background-img-style sections' style={style.background}>
                    <div className='col-12'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <Card style={style.noResult}>
                                    <CardTitle>
                                        <img className="loader-gif" src="/img/loader1.gif" />
                                        <span className="loader-text">Loading</span>
                                    </CardTitle>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            if (this.state.artists.length > 0) {
                return (
                    <div className='background-img-style sections' style={style.background}>
                        <div className='col-12'>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    {this.state.artists.map((artist: any, index: number) =>
                                        <div className='col-10 col-sm-8 col-md-7 col-lg-4' key={index}>
                                            <Card style={style.card}>
                                                <CardMedia
                                                    overlay={<CardTitle style={style.title} title={`${artist.firstName} ${artist.lastName}`} />}
                                                >
                                                    <img style={style.cover} src={`/img/artist/${artist.artistCode}.jpg`} />
                                                </CardMedia>
                                                <CardText style={style.description}>
                                                    <strong>Date of birth: </strong>{artist.birthDate}<br />
                                                    <strong>Introduction: </strong>{artist.introduce}

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