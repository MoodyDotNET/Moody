import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, List, Subheader, ListItem, Dialog, GridList, GridTile, CardActions } from 'material-ui';
import { ArtistDetailPopup } from '../artists/ArtistDetailPopup';
import { AlbumDetailPopup } from '../albums/AlbumDetailPopup';
import { grey100, white } from 'material-ui/styles/colors';

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
    },
    grid: {
        width: '80%',
        height: '80vh',
        overFlowY: 'auto',
    },
}


interface IPlaylist {
    playlist: Array<any>,
    loading: boolean,
    songs: Array<any>,
    openPopup: boolean,
    message: string,
    currentIndex: number,
    openArtist: boolean,
    openAlbum: boolean,
    openComposer: boolean,
}

export class PlaylistComponent extends React.Component<RouteComponentProps<{}>, IPlaylist>{
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            playlist: [],
            songs: [],
            openPopup: false,
            message: "You don't have any song in your playlist currently",
            currentIndex: -1,
            openArtist: false,
            openAlbum: false,
            openComposer: false,
        }
        //load all songs
        fetch('/api/song/all')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({
                    songs: data,
                    loading: false,
                    message: "",
                    currentIndex: 0,
                    playlist: [
                        {
                            "songId": 14,
                            "userId": 4,
                            "song": {
                                "songCode": 14,
                                "title": "Perfect",
                                "subtitle": " ",
                                "rating": 4.3199999809265135,
                                "contributingArtist": 6,
                                "albumId": 5,
                                "composer": 6,
                                "lyric": "3",
                                "album": {
                                    "albumId": 5,
                                    "albumName": "Divide",
                                    "dateReleased": "2017-03-02T17:00:00",
                                    "genre": "Pop",
                                },
                                "composerNavigation": {
                                    "artistCode": 6,
                                    "band": null,
                                    "firstName": "Edward",
                                    "lastName": "Sheeran",
                                    "middleName": "Christopher ",
                                    "biography": "Sheeran was born in Halifax, West Yorkshire, and raised in Framlingham, Suffolk. He attended the Academy of Contemporary Music in Guildford as an undergraduate from the age of 18 in 2009. In early 2011, Sheeran independently released the extended play, No. 5 Collaborations Project.",
                                    "birthDate": "1991-02-16T17:00:00",
                                    "introduce": "An English singer, songwriter, guitarist, record producer, and actor",
                                    "producerCode": 2,

                                },
                                "contributingArtistNavigation": {
                                    "artistCode": 6,
                                    "band": null,
                                    "firstName": "Edward",
                                    "lastName": "Sheeran",
                                    "middleName": "Christopher ",
                                    "biography": "Sheeran was born in Halifax, West Yorkshire, and raised in Framlingham, Suffolk. He attended the Academy of Contemporary Music in Guildford as an undergraduate from the age of 18 in 2009. In early 2011, Sheeran independently released the extended play, No. 5 Collaborations Project.",
                                    "birthDate": "1991-02-16T17:00:00",
                                    "introduce": "An English singer, songwriter, guitarist, record producer, and actor",
                                    "producerCode": 2,
                                }
                            }
                        },

                        {
                            "songId": 13,
                            "userId": 4,
                            "song": {
                                "songCode": 13,
                                "title": "Dive",
                                "subtitle": " ",
                                "rating": 5,
                                "contributingArtist": 6,
                                "albumId": 5,
                                "dateReleased": "1900-01-01T00:00:00",
                                "composer": 6,
                                "lyric": "2",
                                "album": {
                                    "albumId": 5,
                                    "albumName": "Divide",
                                    "dateReleased": "2017-03-02T17:00:00",
                                    "genre": "Pop",
                                
                                },
                                "composerNavigation": {
                                    "artistCode": 6,
                                    "band": null,
                                    "firstName": "Edward",
                                    "lastName": "Sheeran",
                                    "middleName": "Christopher ",
                                    "biography": "Sheeran was born in Halifax, West Yorkshire, and raised in Framlingham, Suffolk. He attended the Academy of Contemporary Music in Guildford as an undergraduate from the age of 18 in 2009. In early 2011, Sheeran independently released the extended play, No. 5 Collaborations Project.",
                                    "birthDate": "1991-02-16T17:00:00",
                                    "introduce": "An English singer, songwriter, guitarist, record producer, and actor",
                                    "producerCode": 2,
                                    
                                },
                                "contributingArtistNavigation": {
                                    "artistCode": 6,
                                    "band": null,
                                    "firstName": "Edward",
                                    "lastName": "Sheeran",
                                    "middleName": "Christopher ",
                                    "biography": "Sheeran was born in Halifax, West Yorkshire, and raised in Framlingham, Suffolk. He attended the Academy of Contemporary Music in Guildford as an undergraduate from the age of 18 in 2009. In early 2011, Sheeran independently released the extended play, No. 5 Collaborations Project.",
                                    "birthDate": "1991-02-16T17:00:00",
                                    "introduce": "An English singer, songwriter, guitarist, record producer, and actor",
                                    "producerCode": 2,
                                }
                            }
                        },

                    ]
                })
            })
        //load playlist
        // fetch('/api/playlist/loadPlaylist')
        //     .then(response => response.json() as Promise<any>)
        //     .then(data => {
        //         if (data.length > 0) {
        //             this.setState({ playlist: data, message: "", currentIndex: 0 })
        //         }
        //         this.setState({ loading: false })
        //     })
        //     .catch(error => {
        //         console.log("error "+error);
        //     })
    }

    private handleOpenPopup() {
        this.setState({ openPopup: true })
    }

    private handleClosePopup() {
        this.setState({ openPopup: false })
    }

    private handleOpenArtist() {
        this.setState({ openArtist: true })
    }

    private handleCloseArtist() {
        this.setState({ openArtist: false })
    }

    private handleOpenComposer() {
        this.setState({ openComposer: true })
    }

    private handleCloseComposer() {
        this.setState({ openComposer: false })
    }

    private handleOpenAlbum() {
        this.setState({ openAlbum: true })
    }

    private handleCloseAlbum() {
        this.setState({ openAlbum: false })
    }

    private onPlayHandle(currentId: number) {
        for (var i = 0; i < this.state.playlist.length; i++) {
            var listItem = document.getElementById("songlist" + i) as HTMLDivElement;
            listItem.style.backgroundColor = white;
        }
        var listItem = document.getElementById("songlist" + currentId) as HTMLDivElement;
        listItem.style.backgroundColor = grey100;
    }

    private onEndHandle() {
        var currentId = this.state.currentIndex;
        if (currentId == this.state.playlist.length - 1) {
            currentId = -1;
        }
        currentId = currentId + 1;
        this.setState({currentIndex:currentId});
        var audio = this.refs.audio as HTMLAudioElement;
        audio.src = `/mp3/${this.state.playlist[currentId].song.songCode}.mp3`;
        audio.load();
        audio.play();
    }


    private changeSong(index: number) {
        this.setState({ currentIndex: index });
        this.forceUpdate();
        var audio = this.refs.audio as HTMLAudioElement;
        audio.src = `/mp3/${this.state.playlist[index].song.songCode}.mp3`;
        audio.load();

    }
    private renderLoading() {
        return (
            <div className='row justify-content-center'>
                <Card style={style.noResult}>
                    <CardTitle>
                        <img className="loader-gif" src="/img/loader1.gif" />
                        <span className="loader-text">Loading</span>
                    </CardTitle>
                </Card>
            </div>
        );
    }

    private renderAddSongPopup() {
        return (
            <div style={style.grid} className="container-fluid">
                <div className="row justify-content-center">
                    {this.state.songs.map((song: any, index: number) =>
                        <div className="col-12 col-sm-6" key={index}>
                            <Card>
                                <CardMedia
                                    overlay={
                                        <CardTitle title={`${song.title} ${song.subtitle}`}
                                        />
                                    }
                                >
                                    <img style={{ height: '30vh' }} src={`/img/song/${song.congCode}.jpg`} />
                                </CardMedia>
                                <CardActions>
                                    <RaisedButton
                                        label="Add"
                                        primary={true}
                                        style={{ display: 'inline-block' }}
                                    />
                                </CardActions>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    private renderSongMedia(index: any) {
        if (index == -1) {
            return (
                <Card style={style.card}>
                    <CardText>
                        {this.state.message}
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            label="Add more songs"
                            primary={true}
                            onClick={() => this.handleOpenPopup()}
                        />
                    </CardActions>
                </Card>
            );
        }
        else {
            return (
                <Card style={style.card}>
                    <CardMedia
                        overlay={
                            <audio controls style={style.audio}
                                ref="audio"
                                id={`audio${index}`}
                                onPlay={() => this.onPlayHandle(index)}
                                onEnded={() => this.onEndHandle()}
                            >
                                <source src={`/mp3/${this.state.playlist[this.state.currentIndex].song.songCode}.mp3`} type="audio/mpeg" />
                            </audio>
                        }
                    >
                        <img style={style.bigCover} src={`/img/song/${this.state.playlist[index].song.songCode}.jpg`} />
                    </CardMedia>

                    <CardTitle
                        title={`${this.state.playlist[index].song.title} ${this.state.playlist[index].song.subtitle}`}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <CardTitle title="Description" />
                        <CardText>
                            <strong>By:</strong>
                            <span className="popup-link-sm" onClick={() => this.handleOpenArtist()}>
                                {`${this.state.playlist[index].song.contributingArtistNavigation.firstName} ${this.state.playlist[index].song.contributingArtistNavigation.lastName}`}</span>
                            <br />
                            <strong>Date released:</strong> {this.state.playlist[index].song.dateReleased}
                            <br />
                            <strong>Composer: </strong>
                            <span className="popup-link-sm" onClick={() => this.handleOpenComposer()}>
                                {`${this.state.playlist[index].song.composerNavigation.firstName} ${this.state.playlist[index].song.composerNavigation.lastName}`}</span>
                            <br />
                            <strong>Album:</strong>
                            <span className="popup-link-sm" onClick={() => this.handleOpenAlbum()}>
                                {this.state.playlist[index].song.album.albumName}
                            </span>

                        </CardText>
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            label="Add more songs"
                            onClick={() => this.handleOpenPopup()}
                            primary={true}
                        />
                    </CardActions>
                    {/* render artist dialog  */}
                    <Dialog
                        open={this.state.openArtist}
                        onRequestClose={() => this.handleCloseArtist()}
                    >
                        <ArtistDetailPopup artistInfo={this.state.playlist[index].song.contributingArtistNavigation} />
                    </Dialog>

                    {/* render composer dialog  */}
                    <Dialog
                        open={this.state.openComposer}
                        onRequestClose={() => this.handleCloseComposer()}
                    >
                        <ArtistDetailPopup artistInfo={this.state.playlist[index].song.composerNavigation} />
                    </Dialog>

                    {/* render album dialog  */}
                    <Dialog
                        open={this.state.openAlbum}
                        onRequestClose={() => this.handleCloseAlbum()}
                    >
                        <AlbumDetailPopup albumInfo={this.state.playlist[index].song.album} />
                    </Dialog>
                </Card >
            )
        }
    }

    private renderSonglist() {
        if (this.state.message.length == 0) {
            return (
                <Card style={style.card}>
                    <List>
                        <Subheader>Songs in playlist</Subheader>
                        {this.state.playlist.map((Playlist: any, index: number) =>
                            <ListItem
                                key={index}
                                id={`songlist${index}`}
                                primaryText={`${Playlist.song.title} ${Playlist.song.subtitle}`}
                                leftAvatar={<img style={style.img} src={`/img/song/${Playlist.song.songCode}.jpg`} />}
                                onClick={() => { this.changeSong(index) }}
                            />
                        )}
                    </List>
                </Card>
            );
        }
        else {
            return (
                <Card style={style.card}>
                    <List>
                        <Subheader>Songs in playlist</Subheader>
                    </List>
                </Card>
            );
        }
    }
    private renderPlaylist() {
        return (
            <div className='row justify-content-center'>
                <div className="col-11 col-md-8">
                    {this.renderSongMedia(this.state.currentIndex)}
                </div>

                <div className="col-11 col-md-4">
                    {this.renderSonglist()}
                </div>
            </div>
        );
    }

    public render() {
        let contents = this.state.loading ? this.renderLoading() : this.renderPlaylist()
        return (
            <div className='background-img-style sections' style={style.background}>
                <div className='col-12'>
                    <div className='container'>

                        {contents}

                        <Dialog
                            open={this.state.openPopup}
                            onRequestClose={() => this.handleClosePopup()}
                        >
                            {this.renderAddSongPopup()}
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }
}