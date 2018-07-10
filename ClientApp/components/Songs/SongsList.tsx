import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, CardActions, RaisedButton, CardHeader, Snackbar } from 'material-ui';
import { blueGrey100, white, pinkA100, limeA200, yellow400 } from 'material-ui/styles/colors';

interface songInterface {
    songs: Array<any>,
    loading: boolean,
    isLogin: boolean,
    openSnackbar: boolean,
    message: string,
}


const style = {
    card: {
        opacity: 0.85,
        marginTop: '0.5vh'
    },
    title: {
        height: '7vh',
        padding: '0px 16px',
    },
    cover: {
        height: '30vh',
    },
    description: {
        height: '10vh'
    },
    background: {
        backgroundImage: 'URL("/img/songBackground.jpg")',
        minHeight: '92.5vh'
    },
    noResult: {
        width: "250px",
        marginTop: "30vh",
        opacity: 0.8
    },
    snackbar: {
        textAlign:'center'
    },
    button:{
        color:'white !important'
    }
};


export class SongsList extends React.Component<RouteComponentProps<any>, songInterface>{
    constructor(props: RouteComponentProps<any>) {
        super(props);
        this.state = { 
            songs: [], 
            loading: true, 
            isLogin: false ,
            openSnackbar: false,
            message:"Add fail",
        }

        const search: any = this.props.match.params;
        var searchValue = search.searchResult;
        if (searchValue != "all") {
            fetch(`api/song/search?searchField=${searchValue}`)
                .then(response => response.json() as Promise<any>)
                .then(data => {
                    if (data != null) {
                        this.setState({ songs: data, loading: false });

                    }
                })
        }
        else {
            fetch('api/song/all')
                .then(response => response.json() as Promise<any>)
                .then(data => {
                    if (data != null) {
                        this.setState({ songs: data, loading: false });
                    }
                })
        }

    }

    componentDidMount() {
        fetch('api/member/current', {
            credentials: "same-origin"
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                this.setState({ isLogin: true })
            })
            .catch(error => {
            })
    }

    addPlaylist(songId:number) {
        if (this.state.isLogin == false) {
            this.setState({message:"You have to login first"});
        }
        else {
            fetch(`/api/playlist/AddToPlayList?id=${songId}`,{
                credentials:"same-origin"
            })
            .then(response => response.json() as Promise<boolean>)
            .then(data => {
                if(data == true){
                    this.setState({message:"Add success"})
                }
                else this.setState({message:"This song has been added"})
            })
        }
        this.setState({openSnackbar:true});
    }

    closeSnackbar(){
        this.setState({openSnackbar:false})
    }
    
    public componentWillReceiveProps(nextProp: RouteComponentProps<{}>) {
        const search: any = nextProp.match.params;

        if (search != null) {
            fetch(`api/song/search?searchField=${search.searchResult}`)
                .then(response => response.json() as Promise<any>)
                .then(data => {
                    if (data != null) {
                        this.setState({ songs: data, loading: false });
                    }
                })
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
                                        <img className="loader-gif" src="/img/loader1.gif"/>
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
            if (this.state.songs.length > 0) {
                return (
                    <div className='background-img-style sections songlist' style={style.background}>
                        <div className='col-12'>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    {this.state.songs.map((song: any, index: number) =>
                                        <div className='col-10 col-sm-8 col-md-7 col-lg-4' key={index}>
                                            <Card style={style.card}>
                                                <CardMedia
                                                    overlay={<CardTitle style={style.title} title={song.title} />}
                                                >
                                                    <img style={style.cover} src={`/img/song/${song.songCode}.jpg`} />
                                                </CardMedia>
                                                <CardText style={style.description}>
                                                    <strong>By:</strong> {`${song.contributingArtistNavigation.firstName} ${song.contributingArtistNavigation.lastName}`}<br/>
                                                    <strong>Date released:</strong> 
                                                    {(new Date(song.dateReleased)).toLocaleDateString()}<br />
                                                    <strong>Album:</strong>{song.album.albumName}
                                                </CardText>
                                                <CardActions>
                                                    <RaisedButton
                                                        label='Hear it'
                                                        containerElement={
                                                            <Link to={`/song/${song.songCode}`}></Link>
                                                        }
                                                        primary={true}
                                                        className="btn"
                                                    />
                                                    <RaisedButton
                                                        label='Add to play list'
                                                        primary={true}
                                                        onClick={() => { this.addPlaylist(song.songCode) }}
                                                    />
                                                    <Snackbar
                                                        style={style.snackbar}
                                                        open={this.state.openSnackbar}
                                                        message={this.state.message}
                                                        autoHideDuration={3000}
                                                        onRequestClose={()=>this.closeSnackbar()}
                                                    />
                                                </CardActions>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div className='background-img-style sections' style={style.background}>
                        <div className='col-12'>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <Card style={style.noResult}>
                                        <CardTitle title="No result" />
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }

    }
}