import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Artist from '../../model/Artist';
import { Card, CardMedia, CardTitle, CardActions, RaisedButton } from 'material-ui';
import { grey50 } from 'material-ui/styles/colors';

const style = {
    cover: {
        height: '40vh'
    },
    noResult: {
        width: '250px',
        marginTop: '15vh',
        opacity: 0.85
    },
    background: {
        background: 'URL("/img/ArtistBackground.jpg")'
    }
}

interface INewArtist {
    newArtist: Array<any>,
    loading: boolean,
}

export class HomeSession4 extends React.Component<{}, INewArtist>{
    constructor(props: {}) {
        super(props);
        this.state = { newArtist: [], loading: true }

        fetch('/api/artist/lastest')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ newArtist: data, loading: false })
            })
    }

    public render() {
        let content = this.state.loading ? this.renderLoading() : this.renderNewArtist();
        return (
            <div className='col-12 section4 sections artistlist' style={style.background}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className="col-12" style={{ textAlign: 'center' }}>
                            <h3 className="header">
                                Artists
                            </h3>
                        </div>
                        {content}
                    </div>
                    <div>
                        <NavLink to={'/artists'}><p className='link'>More artists</p></NavLink>
                    </div>
                </div>
            </div>
        );
    }

    private renderNewArtist() {
        return (
            this.state.newArtist.map((artist: Artist, index: number) =>
                <div className='col-sm-9 col-md-6 col-lg-4 card' key={index}>
                    <Card>
                        <CardMedia
                            overlay={
                                <CardTitle
                                    title={`${artist.firstName} ${artist.lastName}`}
                                />
                            }
                        >
                            <img style={style.cover} src={`/img/artist/${artist.artistCode}.jpg`} />
                        </CardMedia>
                        <CardActions>
                            <RaisedButton
                                label="Read more"
                                primary={true}
                                containerElement={<Link to={`/artist/${artist.artistCode}`} />}
                                className="btn"
                            />
                        </CardActions>
                    </Card>
                </div>
            )
        );
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