import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, Snackbar, Dialog, FlatButton, List, ListItem, Subheader, CardActions, Chip } from 'material-ui';
import { blueGrey100, white, grey100 } from 'material-ui/styles/colors';
import Song from '../../model/Song';
import { ArtistDetailPopup } from '../artists/ArtistDetailPopup';
import { AlbumDetailPopup } from '../albums/AlbumDetailPopup';
import { SongDetail } from './SongDetail';

const style = {
    snackbar: {
        textAlign: 'center',
        zIndex: 1000,
    },
    card: {
        opacity: 0.85,
    },
    title: {
        height: '7vh',
        padding: '0px 16px',
    },
    cover: {
        height: '60vh',
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
        width: "250px",
        marginTop: "30vh",
        opacity: 0.8
    },
    img: {
        width: '50px',
        height: '40px',
    },
    chip: {
        display:'inline-block',
        marginRight:'5px',
    }
}
interface Isong {
    songInfo: any,
    mp3FilePath: any,
    loading: boolean,
    isLogin: boolean,
    related: Array<any>,
}

export class SongComponent extends React.Component<RouteComponentProps<{}>, Isong>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            songInfo: {},
            mp3FilePath: "",
            loading: true,
            isLogin: false,
            related: [],
        }
        var paramURL: any = this.props.match.params;
        var songId: string = paramURL.songId;
        this.loadSongInfo(songId);
    }

    private loadSongInfo(songId: string) {
        fetch(`api/song/get?id=${songId}`)
            .then(response => response.json() as Promise<Song>)
            .then(data => {
                this.setState({
                    songInfo: data,
                    mp3FilePath: "mp3/" + songId + ".mp3",
                    //rate: data.rating / 5 * 100,
                    related: (data.composerNavigation as any).songComposerNavigation,
                });
                
                this.setState({
                    loading: false,
                });
                //load audio src
                var aud = this.refs.audio as HTMLAudioElement;
                aud.load();

            })
    }

    componentWillMount() {
        fetch('api/member/current', {
            credentials: "same-origin"
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                this.setState({ isLogin: true })
                this.forceUpdate();
            })
            .catch(error => {
            })
    }

    componentWillReceiveProps(nextProp: RouteComponentProps<{}>) {
        fetch(`/api/song/get?id=${(nextProp.match.params as any).songId}`)
            .then(res => res.json() as Promise<any>)
            .then(data => {
                this.setState({
                    songInfo: data,
                    //rate: data.rating / 5 * 100,
                    related: data.composerNavigation.songComposerNavigation
                })
                console.log(this.state.songInfo);
                var aud = this.refs.audio as HTMLAudioElement;
                aud.src = `/mp3/${this.state.songInfo.songCode}.mp3`;
                aud.load();
                this.forceUpdate();
            })
    }

    
    private loadTopSong() {
        fetch('/api/song/suggested')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ related: data })
            })
    }

    private loadRelated() {
        if (this.state.related.length == 0) {
            this.loadTopSong();
        }
        return (

            this.state.related.map((song: Song, index: number) =>
                <ListItem
                    key={index}
                    primaryText={`${song.title} ${song.subtitle}`}
                    leftAvatar={<img style={style.img} src={`/img/song/${song.songCode}.jpg`} />}
                    containerElement={
                        <Link to={`/song/${song.songCode}`} />
                    }
                    hoverColor={grey100}
                />
            )
        );
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
                <div className='background-img-style sections song' style={style.background}>
                    <div className='col-12'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className="col-11 col-md-8">
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
                                            title={`${this.state.songInfo.title} ${this.state.songInfo.subtitle}`}
                                        />
                                        
                                        <SongDetail SongInfo={this.state.songInfo} isLogin={this.state.isLogin}/>
                                    </Card>
                                </div>
                                <div className="col-11 col-md-4">
                                    <Card>
                                        <List>
                                            <Subheader>Other songs</Subheader>

                                            {this.loadRelated()}
                                        </List>
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