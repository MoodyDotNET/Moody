import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, List, Subheader, ListItem, Dialog } from 'material-ui';
import { ArtistDetailPopup } from '../artists/ArtistDetailPopup';
import { AlbumDetailPopup } from '../albums/AlbumDetailPopup';

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
                this.setState({ songs: data })
            })
        //load playlist
        fetch('/api/playlist/loadPlaylist')
            .then(response => response.json() as Promise<any>)
            .then(data => {
                console.log(data)
                // if (data.length > 0) {
                //     this.setState({ playlist: data, message: "", currentIndex: 0 })
                // }
                this.setState({ loading: false })
            })
            .catch(error => {
                console.log("error "+error);
            })
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
            <div></div>
        );
    }

    private renderSongMedia(index: any) {
        if (index == -1) {
            return (
                <Card style={style.card}>
                    <CardText>
                        {this.state.message}
                    </CardText>
                </Card>
            );
        }
        else {
            return (
                <Card style={style.card}>
                    <CardMedia
                        overlay={
                            <audio controls style={style.audio}
                                id={index}
                            >
                                <source src={`/mp3/${this.state.playlist[index].song.songCode}.mp3`} type="audio/mpeg" />
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
        if (this.state.message.length > 0) {
            return (
                <Card style={style.card}>
                    <List>
                        <Subheader>Songs in playlist</Subheader>
                        {this.state.playlist.map((playlist: any, index: number) =>
                            <ListItem
                                key={index}
                                primaryText={`${playlist.song.title} ${playlist.song.subtitle}`}
                                leftAvatar={<img style={style.img} src={`/img/song/${playlist.song.songCode}.jpg`} />}
                                onClick={() => { this.setState({ currentIndex: index }) }}
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

                    </div>
                </div>
            </div>
        );
    }
}