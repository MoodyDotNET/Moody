import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, Snackbar, CardHeader, List, Subheader, ListItem, Dialog, GridList, GridTile, CardActions } from 'material-ui';
import { ArtistDetailPopup } from '../artists/ArtistDetailPopup';
import { AlbumDetailPopup } from '../albums/AlbumDetailPopup';
import { grey100, white } from 'material-ui/styles/colors';
import Album from '../../model/Album';

const style = {
    bigCover: {
        height: '60vh'
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
        marginTop: '1vh'
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
        width: '95%',
        height: '80vh',
    },
    snackbar: {
        textAlign: 'center',
    }
}


interface IAlbum {
    album: any,
    loading: boolean,
    others: Array<any>,
    songs: Array<any>,
    message: string,
    currentIndex: number,
    openArtist: boolean,
    openAlbum: boolean,
    openComposer: boolean,
    isLogin: boolean,
    openSnackbar: boolean,
    snackbarMsg: string,
}

export class AlbumComponent2 extends React.Component<RouteComponentProps<{}>, IAlbum>{
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            album: null,
            others: [],
            songs: [],
            message: "there is no song yet",
            currentIndex: 0,
            openArtist: false,
            openAlbum: false,
            openComposer: false,
            isLogin: false,
            openSnackbar: false,
            snackbarMsg: ""
        }
        const param: any = this.props.match.params;
        const id: string = param.id;
        //check login
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
        //load all songs
        this.loadSongs(id);
        //load other
        fetch('/api/album/lastest')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({
                    others: data,
                })
            })
        //load album info
        this.loadAlbum(id);
    }

    private loadSongs(id: string) {
        fetch(`/api/song/from?albumId=${id}`)
            .then(res => res.json() as Promise<Array<any>>)
            .then(data => {
                if (data.length > 0) {
                    this.setState({
                        songs: data,
                        message: ""
                    });
                    var audio = this.refs.audio as HTMLAudioElement;
                    audio.src = `/mp3/${this.state.songs[this.state.currentIndex].songCode}.mp3`;
                    audio.load();
                }

            })
    }
    private loadAlbum(id: string) {
        fetch(`api/album/get?id=${id}`, {
            credentials: "same-origin"
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                if (data != null) {
                    this.setState({ album: data, loading: false });
                    var audio = this.refs.audio as HTMLAudioElement;
                    audio.src = `/mp3/${this.state.songs[this.state.currentIndex].songCode}.mp3`;
                    audio.load();
                }
            })
            .catch(error => {
                console.log("error " + error);
            })
    }

    componentWillReceiveProps(nextProp: RouteComponentProps<{}>) {
        this.setState({ currentIndex: 0 });
        this.loadSongs((nextProp.match.params as any).id);
        this.loadAlbum((nextProp.match.params as any).id);
    }

    private handleOpenAddPlaylist(songId: number) {
        if (this.state.isLogin == false) {
            this.setState({ snackbarMsg: "You have to login first" });
        }
        else {
            fetch(`/api/playlist/AddToPlayList?id=${songId}`, {
                credentials: "same-origin"
            })
                .then(response => response.json() as Promise<boolean>)
                .then(data => {
                    if (data == true) {
                        this.setState({ snackbarMsg: "Add success" })
                    }
                    else this.setState({ snackbarMsg: "This song has been added" })
                })
        }
        this.setState({ openSnackbar: true })
    }

    private handleCloseSnackbar() {
        this.setState({ openSnackbar: false })
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

    private onPlayHandle(currentId: number) {
        for (var i = 0; i < this.state.songs.length; i++) {
            var listItem = document.getElementById("songlist" + i) as HTMLDivElement;
            listItem.style.backgroundColor = white;
        }
        var listItem = document.getElementById("songlist" + currentId) as HTMLDivElement;
        listItem.style.backgroundColor = grey100;
    }

    private onEndHandle() {
        var currentId = this.state.currentIndex;
        if (currentId == this.state.songs.length - 1) {
            currentId = -1;
        }
        currentId = currentId + 1;
        this.setState({ currentIndex: currentId });
        var audio = this.refs.audio as HTMLAudioElement;
        audio.src = `/mp3/${this.state.songs[currentId].songCode}.mp3`;
        audio.load();
        audio.play();
    }


    private changeSong(index: number) {
        this.setState({ currentIndex: index });
        var audio = this.refs.audio as HTMLAudioElement;
        audio.src = `/mp3/${this.state.songs[index].songCode}.mp3`;
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


    private renderSongMedia(index: any) {
        if (this.state.message.length == 0) {
            return (
                <Card>
                    <CardTitle
                        title={`${this.state.songs[index].title} ${this.state.songs[index].subtitle}`}
                    />
                    <CardMedia>
                        <audio controls style={style.audio}
                            ref="audio"
                            id={`audio${index}`}
                            onPlay={() => this.onPlayHandle(index)}
                            onEnded={() => this.onEndHandle()}
                        >
                            <source type="audio/mpeg" />
                        </audio>
                    </CardMedia>

                    <CardTitle
                        title="Description"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <CardText>
                            <strong>By:</strong>
                            <span className="popup-link-sm" onClick={() => this.handleOpenArtist()}>
                                {`${this.state.songs[index].contributingArtistNavigation.firstName} ${this.state.songs[index].contributingArtistNavigation.lastName}`}</span>
                            <br />
                            <strong>Date released:</strong>
                            {(new Date(this.state.songs[index].dateReleased)).toLocaleDateString()}
                            <br />
                            <strong>Composer: </strong>
                            <span className="popup-link-sm" onClick={() => this.handleOpenComposer()}>
                                {`${this.state.songs[index].composerNavigation.firstName} ${this.state.songs[index].composerNavigation.lastName}`}</span>
                        </CardText>
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            label="Hear it"
                            className="btn"
                            primary={true}
                            containerElement={
                                <Link to={`/song/${this.state.songs[index].songCode}`} />
                            }
                        />
                        <RaisedButton
                            label="Add to playlist"
                            className="btn"
                            primary={true}
                            onClick={() => { this.handleOpenAddPlaylist(this.state.songs[index].songCode) }}
                        />
                    </CardActions>
                    {/* render artist dialog  */}
                    <Dialog
                        open={this.state.openArtist}
                        onRequestClose={() => this.handleCloseArtist()}
                    >
                        <ArtistDetailPopup artistInfo={this.state.songs[index].contributingArtistNavigation} />
                    </Dialog>

                    {/* render composer dialog  */}
                    <Dialog
                        open={this.state.openComposer}
                        onRequestClose={() => this.handleCloseComposer()}
                    >
                        <ArtistDetailPopup artistInfo={this.state.songs[index].composerNavigation} />
                    </Dialog>

                </Card >
            )
        }
    }

    private renderSonglist() {
        if (this.state.message.length == 0) {
            return (
                <Card style={style.card}>
                    <div className="album-songs-wrapper">
                        <List>
                            <Subheader>Songs in album</Subheader>
                            <div className="album-songs">
                                {this.state.songs.map((song: any, index: number) =>
                                    <ListItem
                                        key={index}
                                        id={`songlist${index}`}
                                        primaryText={`${song.title} ${song.subtitle}`}
                                        leftAvatar={<img style={style.img} src={`/img/song/${song.songCode}.jpg`} />}
                                        onClick={() => { this.changeSong(index) }}
                                    />
                                )}
                            </div>
                        </List>
                    </div>
                </Card>
            );
        }
        else {
            return (
                <Card style={style.card}>
                    <List>
                        <Subheader>Songs in playlist</Subheader>
                        <ListItem
                            primaryText={this.state.message}
                        />
                    </List>
                </Card>
            );
        }
    }

    private renderRelated() {
        return (
            <Card style={style.card}>
                <div className="album-songs-wrapper">
                    <List>
                        <Subheader>Latest albums</Subheader>
                        <div className="album-songs">
                            {this.state.others.map((album: any, index: number) =>
                                <ListItem
                                    key={index}
                                    primaryText={`${album.albumName}`}
                                    leftAvatar={<img style={style.img} src={`/img/album/${album.albumId}.jpg`} />}
                                    containerElement={
                                        <Link to={`/album/${album.albumId}`} />
                                    }
                                />
                            )}
                        </div>
                    </List>
                </div>
            </Card>
        );

    }

    private renderAlbum() {
        return (
            <div className='row justify-content-center'>
                <div className="col-11 col-sm-10 col-md-7 col-lg-8">
                    <Card style={style.card}>
                        <CardMedia
                            overlay={
                                <CardTitle title={this.state.album.albumName} />
                            }
                        >
                            <img style={style.bigCover} src={`/img/album/${this.state.album.albumId}.jpg`} />
                        </CardMedia>

                        <CardText>
                            Date released: {(new Date(this.state.album.dateReleased)).toLocaleDateString()}<br />
                            Genre: {this.state.album.genre}
                        </CardText>

                        <CardTitle title="Playing : " />
                        {this.renderSongMedia(this.state.currentIndex)}
                    </Card>
                </div>

                <div className="col-11 col-sm-10 col-md-5 col-lg-4">
                    {this.renderSonglist()}
                    {this.renderRelated()}
                </div>
            </div>
        );
    }

    public render() {
        let contents = this.state.loading ? this.renderLoading() : this.renderAlbum()
        return (
            <div className='background-img-style sections albumlist' style={style.background}>
                <div className='col-12'>
                    <div className='container'>

                        {contents}
                        <Snackbar
                            style={style.snackbar}
                            open={this.state.openSnackbar}
                            message={this.state.snackbarMsg}
                            autoHideDuration={2500}
                            onRequestClose={() => this.handleCloseSnackbar()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}