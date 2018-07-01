import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, List, Subheader, ListItem } from 'material-ui';
import { grey50, grey100, white } from 'material-ui/styles/colors';
import Song from '../../model/Song';

const style = {
    bigCover: {
        height: '50vh'
    },
    overlay: {
        background: 'transparent',
    },
    background: {
        background: 'URL("/img/AlbumBackground.jpg")',
        minHeight: '92.5vh'
    },
    card: {
        opacity: 0.85,

    },
    audio: {
        width: '100%'
    },
    noResult: {
        width: "250px",
        marginTop: "30vh",
        opacity: 0.8
    },
    img: {
        width: '50px',
        height: '40px',
    }
}

interface IAlbum {
    album: any,
    loading: boolean,
    related: Array<any>,
    songs: Array<any>,
}

export class AlbumComponent extends React.Component<RouteComponentProps<{}>, IAlbum>{
    constructor(props: any) {
        super(props);
        this.state = { album: {}, loading: true, related: [], songs: [] }
        const param: any = this.props.match.params;
        const id: string = param.id;
        fetch(`api/album/get?id=${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    album: data,
                })
            })
        fetch(`/api/song/from?albumId=${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    songs: data
                })
            })
        fetch('api/album/all')
            .then(res => res.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ related: data, loading: false })
            })
    }

    componentWillReceiveProps(nextProp: RouteComponentProps<{}>) {
        fetch(`api/album/get?id=${(nextProp.match.params as any).id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    album: data,
                })
            })
        fetch(`/api/song/from?albumId=${(nextProp.match.params as any).id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    songs: data
                })
            })
    }

    private nextSong(current: number) {
        var size = this.state.songs.length;
        if (current == size - 1) {
            current = -1;
        }
        var next = current + 1;
        var audio = document.getElementById("audio" + next) as HTMLAudioElement;
        audio.play();

    }

    private currentSongActive(current: number) {
        for (var i = 0; i < this.state.songs.length; i++) {
            var audioWrapper = document.getElementById("audio-wrapper-" + i) as HTMLDivElement;
            audioWrapper.style.backgroundColor = white;
        }
        var audioWrapper = document.getElementById("audio-wrapper-" + current) as HTMLDivElement;
        audioWrapper.style.backgroundColor = grey100;
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
                                <div className="col-11 col-md-8">
                                    <Card style={style.card}>
                                        <CardMedia>
                                            <img style={style.bigCover} src={`/img/album/${this.state.album.albumId}.jpg`} />
                                        </CardMedia>

                                        <CardTitle
                                            title={this.state.album.albumName}
                                            actAsExpander={true}
                                            showExpandableButton={true}
                                        />
                                        <CardText expandable={true}>
                                            <CardTitle title="Description" />
                                            <CardText>
                                                Date released: {this.state.album.dateReleased}<br />
                                                Genre: {this.state.album.genre}
                                            </CardText>
                                        </CardText>
                                        {this.state.songs.map((song: Song, index: number) =>
                                            <CardText >
                                                <div id={`audio-wrapper-${index}`}>
                                                    <CardTitle title={song.title} />
                                                    <audio controls style={style.audio}
                                                        id={`audio${index}`}
                                                        onEnded={() => this.nextSong(index)}
                                                        onPlay={() => this.currentSongActive(index)}
                                                    >
                                                        <source src={`/mp3/${song.songCode}.mp3`} type="audio/mpeg" />
                                                    </audio>
                                                </div>
                                            </CardText>
                                        )}
                                    </Card>
                                </div>

                                <div className="col-11 col-md-4">
                                    <Card style={style.card}>
                                        <List>
                                            <Subheader>Other albums</Subheader>
                                            {this.state.related.map((album: any, index: number) =>
                                                <ListItem
                                                    key={index}
                                                    primaryText={album.albumName}
                                                    leftAvatar={<img style={style.img} src={`/img/album/${album.albumId}.jpg`} />}
                                                    containerElement={
                                                        <Link to={`/album/${album.albumId}`} />
                                                    }
                                                    hoverColor={grey50}
                                                />
                                            )}
                                        </List>
                                    </Card>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}