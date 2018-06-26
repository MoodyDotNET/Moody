import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader,Snackbar, Dialog, FlatButton } from 'material-ui';
import { blueGrey100, white } from 'material-ui/styles/colors';

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
        width: "22%",
        marginTop: "30vh",
        opacity: 0.8
    },
}
interface Isong {
    songInfo: any,
    mp3FilePath: any,
    rateDemo: number,
    loading: boolean,
    openPopup: boolean,
    isLogin:boolean,
    message:string,
    openDialog:boolean,
    userId:any,
}

export class SongComponent extends React.Component<RouteComponentProps<{}>, Isong>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            songInfo: {},
            mp3FilePath: "",
            rateDemo: 4.6 / 5 * 100,
            loading: true,
            openPopup:false,
            isLogin:false,
            message: "",
            openDialog:false,
            userId:-1,
        }
        console.log(this.state.rateDemo);
        var paramURL: any = this.props.match.params;
        var songId: string = paramURL.songId;
        fetch(`api/song/get?id=${songId}`)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                this.setState({
                    songInfo: data,
                    mp3FilePath: "mp3/" + songId + ".mp3",
                    loading: false
                })
                var aud = this.refs.audio as HTMLAudioElement;
                aud.load();
            })

    }

    componentWillMount(){
        fetch('api/member/current', {
            credentials: "same-origin"
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                this.setState({ isLogin: true,userId:data.userId })
                console.log("check: "+this.state.isLogin);
                this.forceUpdate();
            })
            .catch(error => {
            })
    }

    handleOpenRating(){
        if(this.state.isLogin==false){
            this.setState({message:"You have to login first"})
            this.setState({openPopup:true});
        }
        else{
            this.setState({openDialog:true})
        }
    }

    handleOpenAddPlaylist(){
        if(this.state.isLogin==true){
            this.setState({message:"Add success"})
        }
        else {
            this.setState({message:"You have to login first"})
        }
        this.setState({openPopup:true})
    }

    handleClose(){
        this.setState({openPopup:false})
    }

    handleCloseDialog(){
        this.setState({openDialog:false})
    }

    getRating(){
        var songId = this.state.songInfo.songCode;
        var userId = this.state.userId;
        var select = this.refs.ratingScore as HTMLSelectElement;
        var score = select.options[select.selectedIndex].text;
        this.setState({
            openDialog:false,
            openPopup:true,
            message:"songId : "+songId+", userId : "+userId+", rating : "+score
        })
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
                                <div className="col-11 col-sm-8">
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
                                            title={`${this.state.songInfo.title} - ${this.state.songInfo.subtitle}`}
                                            actAsExpander={true}
                                            showExpandableButton={true}
                                        />
                                        <CardText style={style.description} expandable={true}>
                                            By: artist<br />
                                            Date released: date<br />
                                            Album: <a>album name</a>
                                        </CardText>
                                        <CardText style={style.rating}>
                                            Rating:
                                            <div className="rating-outer">
                                                <div className="rating-inner" style={{ width: `${this.state.rateDemo}%` }}>

                                                </div>
                                            </div>
                                            <br/>
                                            <RaisedButton 
                                                label="Add to playlist"
                                                style={{marginRight:'10px'}}
                                                secondary={true}
                                                onClick={()=> {this.handleOpenAddPlaylist()}}
                                            />
                                            
                                            <RaisedButton
                                                label="Rate"
                                                secondary={true}
                                                onClick={()=> {this.handleOpenRating()}}
                                            />
                                            <Dialog 
                                                modal={false}
                                                open={this.state.openDialog}
                                                onRequestClose={()=>{this.handleCloseDialog()}}
                                            >
                                                <FlatButton label="Choose your score : "/>
                                                &nbsp;
                                                <select ref="ratingScore">
                                                    <option>1</option>
                                                    <option>1.25</option>
                                                    <option>1.5</option>
                                                    <option>1.75</option>
                                                    <option>2</option>
                                                    <option>2.25</option>
                                                    <option>2.5</option>
                                                    <option>2.75</option>
                                                    <option>3</option>
                                                    <option>3.25</option>
                                                    <option>3.5</option>
                                                    <option>3.75</option>
                                                    <option>4</option>
                                                    <option>4.25</option>
                                                    <option>4.5</option>
                                                    <option>4.75</option>
                                                    <option>5</option>
                                                </select>
                                                <br/>
                                                <RaisedButton
                                                    style={{marginLeft:'10px'}}
                                                    label="Confifm"
                                                    primary={true}
                                                    onClick={()=>this.getRating()}
                                                />
                                            </Dialog>
                                            <Snackbar
                                                message={this.state.message}
                                                style={{textAlign:'center'}}
                                                open={this.state.openPopup}
                                                autoHideDuration={3000}
                                                onRequestClose={()=>{this.handleClose()}}
                                            />
                                        </CardText>
                                        <CardText>
                                            <CardTitle title="lyrics" />
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                                            in culpa qui officia deserunt mollit anim id est laborum.
                                        </CardText>
                                    </Card>
                                </div>
                                <div className="col-11 col-sm-4">
                                    <Card>
                                        <CardHeader title="Related songs" />
                                        <CardText>

                                        </CardText>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}