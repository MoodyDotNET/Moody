import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, List, Subheader, ListItem } from 'material-ui';
import { grey50 } from 'material-ui/styles/colors';
import Song from '../../model/Song';

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

interface IAlbum {
    album: any,
    loading: boolean,
    related: Array<any>,
}

export class AlbumComponent extends React.Component<RouteComponentProps<{}>, IAlbum>{
    constructor(props: any) {
        super(props);
        this.state = { album: {}, loading: true, related: [] }
        const param: any = this.props.match.params;
        const id: string = param.id;
        fetch(`api/album/get?id=${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    album: data,
                    // loading: false
                })
            })

        fetch('api/album/all')
            .then(res => res.json() as Promise<Array<any>>)
            .then(data => {
                // var index = -1;
                // for (var i = 0; i < data.length; i++) {
                //     if (data[i].albumId == this.state.album.albumId) {
                //         index = i;
                //     }
                // }
                // console.log(index);
                // data.splice(index, 1);
                this.setState({ related: data, loading: false })
            })
    }

    componentWillReceiveProps(nextProp: RouteComponentProps<{}>) {
        fetch(`api/album/get?id=${(nextProp.match.params as any).id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    album: data,
                    // loading: false
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
                                <div className="col-11 col-md-8">
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
                                        {this.state.album.song.map((song: Song, index: number) =>
                                            <CardText>
                                                <CardTitle title={song.title} />

                                                <audio controls style={style.audio}>
                                                    <source src={`/mp3/${song.songCode}.mp3`} type="audio/mpeg" />
                                                </audio>
                                            </CardText>
                                        )}
                                    </Card>
                                </div>

                                <div className="col-11 col-md-4">
                                    <Card style={style.card}>
                                        <List>
                                            <Subheader>Other albums</Subheader>
                                            {this.state.related.map((album: any, index: number) =>
                                                <ListItem
                                                    key={index}
                                                    primaryText={album.albumName}
                                                    leftAvatar={<img style={style.img} src={`/img/album/${album.albumId}.jpg`} />}
                                                    containerElement={
                                                        <Link to={`/album/${album.albumId}`} />
                                                    }
                                                    hoverColor={grey50}
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
}