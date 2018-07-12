import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardActions, Chip, FlatButton, Dialog, Snackbar } from 'material-ui';
import Song from '../../model/Song';
import { ArtistDetailPopup } from '../artists/ArtistDetailPopup';
import { AlbumDetailPopup } from '../albums/AlbumDetailPopup';

interface ISongPopup {
    SongInfo: Song,
    isLogin: boolean,
    openSnackbar: boolean,
    msg: string,
    openDialog: boolean,
    openArtist: boolean,
    openAlbum: boolean,
    openComposer: boolean,
    rate: number,
    genre: Array<string>,
}

const style = {
    cover: {
        height: '50vh',
    },
    description: {
        height: '10vh'
    },
    snackbar: {
        textAlign: 'center',
        zIndex: 1000,
    },
    rating: {
        fontSize: '1.4rem'
    },
    chip: {
        display: 'inline-block',
        marginRight: '5px',
    }
}

export class SongDetail extends React.Component<any, ISongPopup>{
    constructor(props: any) {
        super(props);
        this.state = {
            SongInfo: this.props.SongInfo,
            isLogin: this.props.isLogin,
            msg: "",
            openDialog: false,
            openSnackbar: false,
            openArtist: false,
            openAlbum: false,
            openComposer: false,
            rate: this.props.SongInfo.rating/5*100,
            genre: [],
        }
        
        //load genre
        for (var i = 0; i < this.state.SongInfo.tag.length; i++) {
            this.loadGenre(this.state.SongInfo.tag[i].tagCode);
        }
    }

    componentWillReceiveProps(nextprop: any){
        this.setState({SongInfo:nextprop.SongInfo})
        
    }

    private loadGenre(tagId: number) {
        fetch(`api/song/getTag?id=${tagId}`)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                this.state.genre.push(data.tagName);
                var tags = this.state.genre;
                this.setState({ genre: tags })
            })
    }

    handleOpenRating() {
        if (this.state.isLogin == false) {
            this.setState({ msg: "You have to login first" })
            this.setState({ openSnackbar: true });
        }
        else {
            this.setState({ openDialog: true })
        }
    }

    handleOpenAddPlaylist() {
        if (this.state.isLogin == false) {
            this.setState({ msg: "You have to login first" });
        }
        else {
            fetch(`/api/playlist/AddToPlayList?id=${this.state.SongInfo.songCode}`, {
                credentials: "same-origin"
            })
                .then(response => response.json() as Promise<boolean>)
                .then(data => {
                    if (data == true) {
                        this.setState({ msg: "Add success" })
                    }
                    else this.setState({ msg: "This song has been added" })
                })
        }
        this.setState({ openSnackbar: true })
    }

    handleCloseSnackbar() {
        this.setState({ openSnackbar: false })
    }

    handleCloseDialog() {
        this.setState({ openDialog: false })
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

    getRating() {
        var songId = this.state.SongInfo.songCode;
        var scoreStr = (this.refs.ratingScore as HTMLParagraphElement).innerHTML;
        var score = parseFloat(scoreStr);
        fetch(`/api/member/rating?songID=${songId}&score=${score}`, {
            credentials: "same-origin"
        })
            .then(response => response.json() as Promise<boolean>)
            .then(data => {
                console.log("score: " + score)
                console.log("rating before: " + this.state.rate);
                this.setState({
                    openDialog: false,
                    openSnackbar: true,
                    msg: "Thank you for rating",
                    rate: score / 5 * 100,
                })

            })
            .catch(error => {
                this.setState({
                    openDialog: false,
                    openSnackbar: true,
                    msg: "rating fail =]"
                })
            })
    }

    public render() {
        return (
            <div className="song">
                <CardTitle 
                    title="Description" 
                    actAsExpander={true} 
                    showExpandableButton={true} 
                />
                <CardText expandable={true} className="cardtext-description">
                    <strong>By:</strong>
                    <span className="popup-link-sm" onClick={() => this.handleOpenArtist()}>
                        {`${this.state.SongInfo.contributingArtistNavigation.firstName} ${this.state.SongInfo.contributingArtistNavigation.lastName}`}</span>
                    <br />
                    <strong>Date released:</strong> {(new Date(this.state.SongInfo.dateReleased.toString())).toLocaleDateString()}
                    <br />
                    <strong>Composer: </strong>
                    <span className="popup-link-sm" onClick={() => this.handleOpenComposer()}>
                        {`${this.state.SongInfo.composerNavigation.firstName} ${this.state.SongInfo.composerNavigation.lastName}`}</span>
                    <br />
                    <strong>Album:</strong>
                    <span className="popup-link-sm" onClick={() => this.handleOpenAlbum()}>
                        {this.state.SongInfo.album.albumName}
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
                        message={this.state.msg}
                        style={style.snackbar}
                        open={this.state.openSnackbar}
                        autoHideDuration={2500}
                        onRequestClose={() => { this.handleCloseSnackbar() }}
                    />
                </CardText>
                <CardText>
                    <CardTitle title="lyrics" />
                    <div className="lyric-wrapper">
                        <div className="lyric">
                            <pre>{this.state.SongInfo.lyric}</pre>
                        </div>
                    </div>

                </CardText>
                {/* render artist dialog  */}
                <Dialog
                    open={this.state.openArtist}
                    onRequestClose={() => this.handleCloseArtist()}
                >
                    <ArtistDetailPopup artistInfo={this.state.SongInfo.contributingArtistNavigation} />
                </Dialog>

                {/* render composer dialog  */}
                <Dialog
                    open={this.state.openComposer}
                    onRequestClose={() => this.handleCloseComposer()}
                >
                    <ArtistDetailPopup artistInfo={this.state.SongInfo.composerNavigation} />
                </Dialog>

                {/* render album dialog  */}
                <Dialog
                    open={this.state.openAlbum}
                    onRequestClose={() => this.handleCloseAlbum()}
                >
                    <AlbumDetailPopup albumInfo={this.state.SongInfo.album} />
                </Dialog>

            </div>
        );
    }
}