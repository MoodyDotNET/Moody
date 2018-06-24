import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader } from 'material-ui';
import { blueGrey100, white } from 'material-ui/styles/colors';

const style = {
    card: {
        opacity: 0.85,
    },
    title: {
        height: '7vh',
        padding: '0px 16px',
    },
    cover: {
        height: '50vh',
    },
    description: {
        height: '10vh'
    },
    background: {
        backgroundImage: 'URL("/img/songBackground.jpg")',
        minHeight: '92.5vh'
    },
    audio: {
        width: '100%',
        borderRadius: 0,
    },
    rating: {
        fontSize: '1.4rem'
    },
    noResult: {
        width: "22%",
        marginTop: "30vh",
        opacity: 0.8
    },
}
interface Isong {
    songInfo: any,
    mp3FilePath: any,
    rateDemo: number,
    loading: boolean,
}

export class SongComponent extends React.Component<RouteComponentProps<{}>, Isong>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            songInfo: {},
            mp3FilePath: "",
            rateDemo: 4.6 / 5 * 100,
            loading: true,
        }
        console.log(this.state.rateDemo);
        var paramURL: any = this.props.match.params;
        var songId: string = paramURL.songId;
        fetch(`api/song/get?id=${songId}`)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                this.setState({
                    songInfo: data,
                    mp3FilePath: "mp3/" + songId + ".mp3",
                    loading: false
                })
                var aud = this.refs.audio as HTMLAudioElement;
                aud.load();

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
            return (
                <div className='background-img-style sections' style={style.background}>
                    <div className='col-12'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className="col-11 col-sm-8">
                                    <Card style={style.card}>
                                        <CardMedia
                                            overlay={
                                                <audio controls style={style.audio} ref="audio">
                                                    <source src={this.state.mp3FilePath} type="audio/mpeg" />
                                                </audio>
                                            }

                                        >
                                            <img style={style.cover} src={`img/song/${this.state.songInfo.songCode}.jpg`} />
                                        </CardMedia>
                                        <CardTitle
                                            style={style.title}
                                            title={`${this.state.songInfo.title} - ${this.state.songInfo.subtitle}`}
                                            actAsExpander={true}
                                            showExpandableButton={true}
                                        />
                                        <CardText style={style.description} expandable={true}>
                                            By: artist<br />
                                            Date released: date<br />
                                            Album: <a>album name</a>
                                        </CardText>
                                        <CardText style={style.rating}>
                                            Rating:
                                            <div className="rating-outer">
                                                <div className="rating-inner" style={{ width: `${this.state.rateDemo}%` }}>

                                                </div>
                                            </div>
                                        </CardText>
                                        <CardText>
                                            <CardTitle title="lyrics" />
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
                                        <CardHeader title="Related songs" />
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
}