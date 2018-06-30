import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, Snackbar, Dialog, FlatButton, List, ListItem, Subheader, CardActions } from 'material-ui';
import { blueGrey100, white, grey100 } from 'material-ui/styles/colors';
import Song from '../../model/Song';
import { ArtistDetailPopup } from '../artists/ArtistDetailPopup';
import { AlbumDetailPopup } from '../albums/AlbumDetailPopup';

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
        width: "250px",
        marginTop: "30vh",
        opacity: 0.8
    },
    img: {
        width: '50px',
        height: '40px',
    },

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
            openComposer: false
        }
        var paramURL: any = this.props.match.params;
        var songId: string = paramURL.songId;
        fetch(`api/song/get?id=${songId}`)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                this.setState({
                    songInfo: data,
                    mp3FilePath: "mp3/" + songId + ".mp3",
                    rate: data.rating / 5 * 100,
                    loading: false,
                });
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
                this.setState({ songInfo: data, rate: data.rating / 5 * 100 })
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
        if (this.state.isLogin == true) {
            this.setState({ message: "Add success" })
        }
        else {
            this.setState({ message: "You have to login first" })
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
        fetch(`/api/member/rating?songID=${songId}&score=${score}`)
            .then(response => response.json() as Promise<boolean>)
            .then(data => {
                console.log("score: " + score)
                this.setState({
                    openDialog: false,
                    openPopup: true,
                    message: "Thank you for rating"
                })
            })
            .catch(error => {
                this.setState({
                    openDialog: false,
                    openPopup: true,
                    message: "You've already rated this song =]"
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
                                            <strong>Date released:</strong> {this.state.songInfo.dateReleased}
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
                                            Rating:
                                            <div className="rating-outer">
                                                <div className="rating-inner" style={{ width: `${this.state.rate}%` }}>

                                                </div>
                                            </div>
                                            <br />
                                            <RaisedButton
                                                label="Add to playlist"
                                                style={{ marginRight: '10px' }}
                                                secondary={true}
                                                onClick={() => { this.handleOpenAddPlaylist() }}
                                            />

                                            <RaisedButton
                                                label="Rate"
                                                secondary={true}
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
                                                    label="Confifm"
                                                    primary={true}
                                                    onClick={() => this.getRating()}
                                                />
                                            </Dialog>
                                            <Snackbar
                                                message={this.state.message}
                                                style={{ textAlign: 'center' }}
                                                open={this.state.openPopup}
                                                autoHideDuration={3000}
                                                onRequestClose={() => { this.handleClose() }}
                                            />
                                        </CardText>
                                        <CardText>
                                            <CardTitle title="lyrics" />
                                            {this.state.songInfo.lyrics}
                                        </CardText>
                                    </Card>
                                </div>
                                <div className="col-11 col-md-4">
                                    <Card>
                                        <List>
                                            <Subheader>Other songs</Subheader>

                                            {this.state.songInfo.composerNavigation.songComposerNavigation.map((song: Song, index: number) =>
                                                <ListItem
                                                    key={index}
                                                    primaryText={`${song.title} ${song.subtitle}`}
                                                    leftAvatar={<img style={style.img} src={`/img/song/${song.songCode}.jpg`} />}
                                                    containerElement={
                                                        <Link to={`/song/${song.songCode}`} />
                                                    }
                                                    hoverColor={grey100}
                                                />
                                            )}
                                        </List>
                                    </Card>
                                </div>
                                {/* render artist dialog  */}
                                <Dialog
                                    open={this.state.openArtist}
                                    onRequestClose={() => this.handleCloseArtist()}
                                >
                                    <ArtistDetailPopup artistInfo={this.state.songInfo.contributingArtistNavigation}/>
                                </Dialog>

                                {/* render composer dialog  */}
                                <Dialog
                                    open={this.state.openComposer}
                                    onRequestClose={() => this.handleCloseComposer()}
                                >
                                    <ArtistDetailPopup artistInfo={this.state.songInfo.composerNavigation}/>
                                </Dialog>

                                {/* render album dialog  */}
                                <Dialog
                                    open={this.state.openAlbum}
                                    onRequestClose={() => this.handleCloseAlbum()}
                                >
                                    <AlbumDetailPopup albumInfo={this.state.songInfo.album}/>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}