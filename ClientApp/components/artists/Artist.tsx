import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, Tab, Tabs, List, ListItem, Avatar, Subheader, Snackbar } from 'material-ui';
import { red200, black, grey200, grey900, grey100 } from 'material-ui/styles/colors';
const style = {
    bigCover: {
        height: '60vh'
    },
    overlay: {
        background: 'transparent',
        maxHeight: '14vh',
    },
    background: {
        background: 'URL("/img/ArtistBackground.jpg")',
        minHeight: '92.5vh'
    },
    card: {
        opacity: 0.85
    },
    tabs: {
        backgroundColor: grey200,
        color: grey900
    },
    noResult: {
        width: "250px",
        marginTop: "30vh",
        opacity: 0.8
    },
    snackbar: {
        textAlign: 'center'
    },
}

interface IArtist {
    artist: any,
    loading: boolean,
    related: Array<any>,
    isLogin: boolean,
    msg: string,
    openSnackbar: boolean,
}

export class ArtistComponent extends React.Component<RouteComponentProps<{}>, IArtist>{
    constructor(props: any) {
        super(props);
        this.state = {
            artist: {},
            loading: true,
            related: [],
            isLogin: false,
            msg: "",
            openSnackbar: false,
        }
        var param: any = this.props.match.params;
        var id: string = param.id;
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
        //get artist info
        fetch(`api/artist/get?id=${id}`)
            .then(res => res.json() as Promise<any>)
            .then(data => {
                this.setState({
                    artist: data,
                    // loading: false
                })
            })
        //get related artist
        fetch('api/artist/all')
            .then(res => res.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ related: data, loading: false })
            })
    }

    componentWillReceiveProps(nextProps: RouteComponentProps<{}>) {
        fetch(`/api/artist/get?id=${(nextProps.match.params as any).id}`)
            .then(res => res.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ artist: data })
            })
    }

    private handleOpenAddPlaylist(songId: number) {
        if (this.state.isLogin == false) {
            this.setState({ msg: "You have to login first" });
        }
        else {
            fetch(`/api/playlist/AddToPlayList?id=${songId}`, {
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

    private handleCloseSnackbar() {
        this.setState({ openSnackbar: false })
    }

    private loadComposition() {
        if ((this.state.artist.songComposerNavigation as Array<any>).length == 0) {
            return (
                <p>There is no composition yet</p>
            )
        }
        else {
            return (
                this.state.artist.songComposerNavigation.map((song: any, index: number) =>
                    <ListItem
                        key={index}
                        leftAvatar={<Avatar src={`/img/song/${song.songCode}.jpg`} />}
                        primaryText={
                            <div>
                                {song.title}
                                <div className="btn-group">
                                    <RaisedButton
                                        label="Hear it"
                                        primary={true}
                                        containerElement={
                                            <Link to={`/song/${song.songCode}`} />
                                        }
                                        className="btn"
                                    />
                                    <RaisedButton
                                        label="Add to playlist"
                                        className="btn"
                                        primary={true}
                                        onClick={() => { this.handleOpenAddPlaylist(song.songCode) }}
                                    />
                                </div>

                            </div>
                        }
                    />
                )
            )
        }
    }

    private loadSongs() {
        if ((this.state.artist.songContributingArtistNavigation as Array<any>).length == 0) {
            return (
                <p>There is no song yet</p>
            )
        }
        else {
            return (
                this.state.artist.songContributingArtistNavigation.map((song: any, index: number) =>
                    <ListItem
                        key={index}
                        leftAvatar={<Avatar src={`/img/song/${song.songCode}.jpg`} />}
                        primaryText={
                            <div>
                                {song.title}
                                <div className="btn-group">
                                    <RaisedButton
                                        label="Hear it"
                                        primary={true}
                                        containerElement={
                                            <Link to={`/song/${song.songCode}`} />
                                        }
                                        className="btn"
                                    />
                                    <RaisedButton
                                        label="Add to playlist"
                                        className="btn"
                                        primary={true}
                                        onClick={() => { this.handleOpenAddPlaylist(song.songCode) }}
                                    />
                                </div>

                            </div>
                        }
                    />
                )
            )
        }
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
        else
            return (
                <div className='background-img-style sections artist' style={style.background}>
                    <div className='col-12'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className="col-11 col-md-8">
                                    <Card>
                                        <CardMedia
                                            overlay={
                                                <CardHeader
                                                    style={style.overlay}
                                                    // title={`${this.state.artist.firstName} ${this.state.artist.lastName}`}
                                                    avatar={
                                                        <div>
                                                            <Avatar src={`/img/artist/${this.state.artist.artistCode}.jpg`} size={50} />
                                                            <span className="artistName">{this.state.artist.firstName} {this.state.artist.lastName}</span>
                                                        </div>
                                                    }
                                                />
                                            }
                                        >
                                            <img style={style.bigCover} src={`/img/artist/${this.state.artist.artistCode}.jpg`} />
                                        </CardMedia>
                                        <CardText style={style.card}>
                                            <Tabs>
                                                <Tab label="Profile" style={style.tabs}>
                                                    <Card>
                                                        <CardTitle title="profile" />
                                                        <CardText>
                                                            <strong>Date of birth</strong>: {(new Date(this.state.artist.birthDate)).toLocaleDateString()}<br />
                                                            <strong>Band</strong>: {this.state.artist.band}<br />
                                                            <strong>Introduction</strong>: {this.state.artist.introduce}<br />
                                                            <strong>Biography</strong>: {this.state.artist.biography}
                                                        </CardText>
                                                    </Card>
                                                </Tab>
                                                <Tab label="Composition" style={style.tabs} >
                                                    <List>
                                                        {this.loadComposition()}
                                                    </List>
                                                </Tab>
                                                <Tab label="Song" style={style.tabs}>
                                                    <List>
                                                        {this.loadSongs()}
                                                    </List>
                                                </Tab>
                                            </Tabs>
                                        </CardText>
                                    </Card>
                                    <Snackbar
                                        style={style.snackbar}
                                        open={this.state.openSnackbar}
                                        message={this.state.msg}
                                        autoHideDuration={2500}
                                        onRequestClose={() => this.handleCloseSnackbar()}
                                    />
                                </div>

                                <div className="col-11 col-md-4">
                                    <Card style={style.card}>
                                        <List>
                                            <Subheader>Other artists</Subheader>
                                            {this.state.related.map((artist: any, index: number) =>
                                                <ListItem
                                                    key={index}
                                                    primaryText={`${artist.firstName} ${artist.lastName}`}
                                                    leftAvatar={<Avatar src={`/img/artist/${artist.artistCode}.jpg`} size={40} />}
                                                    containerElement={
                                                        <Link to={`/artist/${artist.artistCode}`}></Link>
                                                    }
                                                    hoverColor={grey100}
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