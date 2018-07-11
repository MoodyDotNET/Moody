import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, Snackbar, Dialog, FlatButton, List, ListItem, Subheader, CardActions, Chip } from 'material-ui';
import { blueGrey100, white, grey100 } from 'material-ui/styles/colors';
import Song from '../../model/Song';
import { ArtistDetailPopup } from '../artists/ArtistDetailPopup';
import { AlbumDetailPopup } from '../albums/AlbumDetailPopup';

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
    openPopup: boolean,
    isLogin: boolean,
    message: string,
    openDialog: boolean,
    rate: number,
    openArtist: boolean,
    openAlbum: boolean,
    openComposer: boolean,
    related: Array<any>,
    genre: Array<string>,
}

export class SongComponent extends React.Component<RouteComponentProps<{}>, Isong>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            songInfo: {},
            mp3FilePath: "",
            loading: true,
            openPopup: false,
            isLogin: false,
            message: "",
            openDialog: false,
            rate: 0,
            openArtist: false,
            openAlbum: false,
            openComposer: false,
            related: [],
            genre: [],
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
                    rate: data.rating / 5 * 100,
                    related: (data.composerNavigation as any).songComposerNavigation,
                });
                //load genre
                for (var i = 0; i < this.state.songInfo.tag.length; i++) {
                    this.loadGenre(this.state.songInfo.tag[i].tagCode);
                }
                this.setState({
                    loading: false,
                });
                console.log(this.state.genre);
                //load audio src
                var aud = this.refs.audio as HTMLAudioElement;
                aud.load();

            })
    }

    private loadGenre(tagId: string) {
        fetch(`api/song/getTag?id=${tagId}`)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                this.state.genre.push(data.tagName);
                var tags = this.state.genre;
                this.setState({ genre: tags })
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
                    rate: data.rating / 5 * 100,
                    related: data.composerNavigation.songComposerNavigation
                })
                var aud = this.refs.audio as HTMLAudioElement;
                aud.src = `/mp3/${this.state.songInfo.songCode}.mp3`;
                aud.load();
            })
    }

    handleOpenRating() {
        if (this.state.isLogin == false) {
            this.setState({ message: "You have to login first" })
            this.setState({ openPopup: true });
        }
        else {
            this.setState({ openDialog: true })
        }
    }

    handleOpenAddPlaylist() {
        if (this.state.isLogin == false) {
            this.setState({ message: "You have to login first" });
        }
        else {
            fetch(`/api/playlist/AddToPlayList?id=${this.state.songInfo.songCode}`, {
                credentials: "same-origin"
            })
                .then(response => response.json() as Promise<boolean>)
                .then(data => {
                    if (data == true) {
                        this.setState({ message: "Add success" })
                    }
                    else this.setState({ message: "This song has been added" })
                })
        }
        this.setState({ openPopup: true })
    }

    handleClose() {
        this.setState({ openPopup: false })
    }

    handleCloseDialog() {
        this.setState({ openDialog: false })
    }

    getRating() {
        var songId = this.state.songInfo.songCode;
        var scoreStr = (this.refs.ratingScore as HTMLParagraphElement).innerHTML;
        var score = parseFloat(scoreStr);
        fetch(`/api/member/rating?songID=${songId}&score=${score}`,{
            credentials:"same-origin"
        })
            .then(response => response.json() as Promise<boolean>)
            .then(data => {
                console.log("score: " + score)
                console.log("rating before: "+this.state.rate);
                this.setState({
                    openDialog: false,
                    openPopup: true,
                    message: "Thank you for rating",
                    rate: score/ 5 * 100,
                })
                console.log("rating after: "+this.state.rate);
            })
            .catch(error => {
                this.setState({
                    openDialog: false,
                    openPopup: true,
                    message: "rating fail =]"
                })
            })
    }

    handleOpenArtist() {
        this.setState({ openArtist: true })
    }

    handleCloseArtist() {
        this.setState({ openArtist: false })
    }

    handleOpenComposer() {
        this.setState({ openComposer: true })
    }

    handleCloseComposer() {
        this.setState({ openComposer: false })
    }

    handleOpenAlbum() {
        this.setState({ openAlbum: true })
    }

    handleCloseAlbum() {
        this.setState({ openAlbum: false })
    }

    private getRateScore(e: any) {
        var ratingOuter = this.refs.ratingOuter as HTMLDivElement;
        var ratingWidth = ratingOuter.offsetWidth;
        var mouseXCor = e.nativeEvent.offsetX;
        var ratingInner = this.refs.ratingInner as HTMLDivElement;
        var widthStr = (((mouseXCor / ratingWidth) * 100).toString()) + "px";
        ratingInner.style.width = (mouseXCor.toString()) + "px";
        var scoreTxt = this.refs.ratingScore as HTMLParagraphElement;
        scoreTxt.innerHTML = (Math.round(mouseXCor * 5 / ratingWidth * 10) / 10).toString() + " / 5.0";
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
                                            actAsExpander={true}
                                            showExpandableButton={true}
                                        />
                                        <CardText style={style.description} expandable={true} className="cardtext-description">
                                            <strong>By:</strong>
                                            <span className="popup-link-sm" onClick={() => this.handleOpenArtist()}>
                                                {`${this.state.songInfo.contributingArtistNavigation.firstName} ${this.state.songInfo.contributingArtistNavigation.lastName}`}</span>
                                            <br />
                                            <strong>Date released:</strong> {(new Date(this.state.songInfo.dateReleased)).toLocaleDateString()}
                                            <br />
                                            <strong>Composer: </strong>
                                            <span className="popup-link-sm" onClick={() => this.handleOpenComposer()}>
                                                {`${this.state.songInfo.composerNavigation.firstName} ${this.state.songInfo.composerNavigation.lastName}`}</span>
                                            <br />
                                            <strong>Album:</strong>
                                            <span className="popup-link-sm" onClick={() => this.handleOpenAlbum()}>
                                                {this.state.songInfo.album.albumName}
                                            </span>

                                        </CardText>

                                        <CardText style={style.rating}>
                                            {this.state.genre.map((tag: string, index: number) =>
                                                <Chip key={index} style={style.chip} >{tag}</Chip>
                                            )}
                                            <br />
                                            Rating:
                                            <div className="rating-outer">
                                                <div className="rating-inner" style={{ width: `${this.state.rate}%` }}>

                                                </div>
                                            </div>
                                            <br />
                                            <RaisedButton
                                                label="Add to playlist"
                                                className="btn"
                                                primary={true}
                                                onClick={() => { this.handleOpenAddPlaylist() }}
                                            />

                                            <RaisedButton
                                                label="Rate"
                                                className="btn"
                                                primary={true}
                                                onClick={() => { this.handleOpenRating() }}
                                            />
                                            <Dialog
                                                modal={false}
                                                open={this.state.openDialog}
                                                onRequestClose={() => { this.handleCloseDialog() }}
                                            >
                                                <FlatButton label="Choose your score : " style={{ cursor: 'text' }} />
                                                &nbsp;
                                                <div className="rating-outer" ref="ratingOuter"
                                                    onMouseMove={this.getRateScore.bind(this)}
                                                    onClick={() => this.getRating()}
                                                >
                                                    <div className="rating-inner" ref="ratingInner">
                                                    </div>
                                                </div>&nbsp;&nbsp;&nbsp;
                                                <p style={{ display: 'inline-block' }} ref="ratingScore">0 / 5.0</p>
                                                <br />
                                                <RaisedButton
                                                    style={{ marginLeft: '10px' }}
                                                    label="Confirm"
                                                    primary={true}
                                                    onClick={() => this.getRating()}
                                                />
                                            </Dialog>
                                            <Snackbar
                                                message={this.state.message}
                                                style={style.snackbar}
                                                open={this.state.openPopup}
                                                autoHideDuration={2500}
                                                onRequestClose={() => { this.handleClose() }}
                                            />
                                        </CardText>
                                        <CardText>
                                            <CardTitle title="lyrics" />
                                            <div className="lyric-wrapper">
                                                <div className="lyric">
                                                    <pre>{this.state.songInfo.lyric}</pre>
                                                </div>
                                            </div>

                                        </CardText>
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
                                {/* render artist dialog  */}
                                <Dialog
                                    open={this.state.openArtist}
                                    onRequestClose={() => this.handleCloseArtist()}
                                >
                                    <ArtistDetailPopup artistInfo={this.state.songInfo.contributingArtistNavigation} />
                                </Dialog>

                                {/* render composer dialog  */}
                                <Dialog
                                    open={this.state.openComposer}
                                    onRequestClose={() => this.handleCloseComposer()}
                                >
                                    <ArtistDetailPopup artistInfo={this.state.songInfo.composerNavigation} />
                                </Dialog>

                                {/* render album dialog  */}
                                <Dialog
                                    open={this.state.openAlbum}
                                    onRequestClose={() => this.handleCloseAlbum()}
                                >
                                    <AlbumDetailPopup albumInfo={this.state.songInfo.album} />
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}