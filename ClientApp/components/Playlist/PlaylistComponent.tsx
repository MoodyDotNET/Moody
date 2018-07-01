import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton,Snackbar,CardHeader, List, Subheader, ListItem, Dialog, GridList, GridTile, CardActions } from 'material-ui';
import { ArtistDetailPopup } from '../artists/ArtistDetailPopup';
import { AlbumDetailPopup } from '../albums/AlbumDetailPopup';
import { grey100, white } from 'material-ui/styles/colors';

const style = {
    bigCover: {
        height: '50vh'
    },
    coverPopup:{
        height: '30vh'
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
        textAlign:'center',
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
    snackbarMsg:string,
    snackbarOpen:boolean,
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
            snackbarOpen: false,
            snackbarMsg:"",
        }
        //load all songs
        fetch('/api/song/all')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({
                    songs: data,
                })
            })
        this.loadPlaylist();
    }

    private loadPlaylist(){
        fetch('api/playlist/loadPlaylist',{
            credentials:"same-origin"
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                if (data.length > 0) {
                    this.setState({ playlist: data, message: "", currentIndex: 0 })
                }
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

    private handleCloseSnackbar(){
        this.setState({snackbarOpen:false})
    }

    private handleOpenSnackbar(){
        this.setState({snackbarOpen:true})
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

    private addToPlaylist(songId:number){
        fetch(`/api/playlist/AddToPlayList?id=${songId}`,{
            credentials:"same-origin"
        })
        .then(response => response.json() as Promise<boolean>)
        .then(data => {
            if(data == true){
                this.loadPlaylist();
                this.setState({snackbarMsg:"Add success"})
            }
            else this.setState({snackbarMsg:"This song has been added"})
            this.setState({snackbarOpen:true})
        })
    }

    private removeFromPlaylist(songId:number){
        fetch(`/api/playlist/RemoveFromPlayList?id=${songId}`,{
            credentials:"same-origin"
        })
        .then(response => response.json() as Promise<boolean>)
        .then(data => {
            if(data == true){
                if(this.state.playlist.length > 1){
                    this.loadPlaylist();
                }
                else {
                    this.setState({
                        currentIndex:-1,
                        message:"You don't have any song in your playlist currently",
                        playlist:[]
                    })               
                }
                this.setState({snackbarMsg:"Remove success"})
            }
            else this.setState({snackbarMsg:"Remove fail"})
            this.setState({snackbarOpen:true})
        })
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
            <div className="container-fluid" style={style.grid} >
                <div className="row justify-content-center">
                    {this.state.songs.map((song: any, index: number) =>
                        <div className="col-12 col-sm-6" key={index}>
                            <Card>
                                <CardMedia
                                    overlay={
                                        <CardTitle title={`${song.title} ${song.subtitle}`}/>
                                    }
                                >
                                    <img style={style.coverPopup} src={`/img/song/${song.songCode}.jpg`} />
                                </CardMedia>
                                <CardActions>
                                    <RaisedButton
                                        label="Add"
                                        primary={true}
                                        onClick={() => this.addToPlaylist(song.songCode)}
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
                                rightIconButton={
                                    <RaisedButton
                                        label="Remove"
                                        primary={true}
                                        onClick={() => this.removeFromPlaylist(Playlist.song.songCode)}
                                    />
                                }
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
                <div className="col-11 col-sm-10 col-md-7 col-lg-8">
                    {this.renderSongMedia(this.state.currentIndex)}
                </div>

                <div className="col-11 col-sm-10 col-md-5 col-lg-4">
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
                            className="playlist-songPopup" 
                            open={this.state.openPopup}
                            onRequestClose={() => this.handleClosePopup()}
                        >
                            {this.renderAddSongPopup()}
                        </Dialog>
                        <Snackbar
                            style={style.snackbar}
                            open={this.state.snackbarOpen}
                            message={this.state.snackbarMsg}
                            onRequestClose={()=>this.handleCloseSnackbar()}
                            autoHideDuration={2500}
                        />
                    </div>
                </div>
            </div>
        );
    }
}