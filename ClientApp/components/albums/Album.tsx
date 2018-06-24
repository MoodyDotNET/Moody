import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader } from 'material-ui';

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
        width: "22%",
        marginTop: "30vh",
        opacity: 0.8
    }
}

interface IAlbum {
    album: any,
    loading: boolean
}

export class AlbumComponent extends React.Component<RouteComponentProps<{}>, IAlbum>{
    constructor(props: any) {
        super(props);
        this.state = { album: {}, loading: true }
        const param: any = this.props.match.params;
        const id: string = param.id;
        fetch(`api/album/get?id=${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    album: data,
                    loading: false
                })
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
                                <div className="col-11 col-sm-9">
                                    <Card style={style.card}>
                                        <CardMedia>
                                            <img style={style.bigCover} src={`/img/album/${this.state.album.albumId}.jpg`} />
                                        </CardMedia>

                                        <CardTitle
                                            title={this.state.album.albumName}
                                            actAsExpander={true}
                                            showExpandableButton={true}
                                        />
                                        <CardText expandable={true}>
                                            <CardTitle title="Description" />
                                            <CardText>
                                                Date released: {this.state.album.dateReleased}<br />
                                                Genre: {this.state.album.genre}
                                            </CardText>
                                        </CardText>

                                        <CardText>
                                            <CardTitle title="song name" />
                                            <audio controls style={style.audio}>
                                                <source src="" type="audio/mpeg" />
                                            </audio>
                                            <CardTitle title="song name" />
                                            <audio controls style={style.audio}>
                                                <source src="" type="audio/mpeg" />
                                            </audio>
                                            <CardTitle title="song name" />
                                            <audio controls style={style.audio}>
                                                <source src="" type="audio/mpeg" />
                                            </audio>
                                        </CardText>
                                    </Card>
                                </div>

                                <div className="col-11 col-sm-3">
                                    <Card style={style.card}>
                                        <CardHeader title="other albums" />
                                    </Card>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}