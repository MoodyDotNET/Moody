import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, CardActions, RaisedButton } from 'material-ui';
import { grey50 } from 'material-ui/styles/colors';

interface INewAlbum {
    newAlbum: any,
    loading: boolean,
}
const style = {
    noResult: {
        width: "250px",
        marginTop: "15vh",
        opacity: 0.8
    },
    background: {
        backgroundImage: 'URL("/img/AlbumBackground.jpg")'
    },
    linkColor: {
        color: grey50
    }
}
export class HomeSession3 extends React.Component<{}, INewAlbum>{
    constructor(props: {}) {
        super(props);
        this.state = { newAlbum: [], loading: true };
        fetch('/api/album/lastest')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ newAlbum: data, loading: false });
            })
    }
    public render() {
        let content = this.state.loading ? this.renderLoading() : this.renderAlbum();

        return (
            <div className='col-12 section3 sections albumlist' style={style.background}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className="col-12" style={{ textAlign: 'center' }}>
                            <h3 className="header">
                                New Albums
                            </h3>
                        </div>
                        {content}
                    </div>
                    <div>
                        <NavLink to={'/albums'}><p className='link' style={style.linkColor}>More albums</p></NavLink>
                    </div>
                </div>
            </div>
        );
    }

    private renderAlbum() {
        return (
            this.state.newAlbum.map((album: any, index: number) =>
                <div className='col-12 col-sm-8 col-md-7 col-lg-4 album-wrapper' key={index}>
                    <Card>
                        <CardMedia
                            overlay={<CardTitle title={album.albumName} />}
                        >
                            <img className="album-cover" src={`/img/album/${album.albumId}.jpg`} />
                        </CardMedia>
                        <CardText className='album-script'>
                            Date Release: {(new Date(album.dateReleased)).toLocaleDateString()}<br />
                            Genre: {album.genre}
                        </CardText>
                        <CardActions>
                            <RaisedButton
                                label='Hear it'
                                primary={true}
                                containerElement={
                                    <Link to={`/album/${album.albumId}`} />
                                }
                                className="btn"
                            />
                        </CardActions>
                    </Card>
                </div>
            )
        )

    }

    private renderLoading() {
        return (
            <Card style={style.noResult}>
                <CardTitle>
                    <img className="loader-gif" src="/img/loader1.gif" />
                    <span className="loader-text">Loading</span>
                </CardTitle>
            </Card>

        );
    }
}