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
        background: 'URL("/img/ArtistBackground.jpg")',
        minHeight: '92.5vh'
    },
    card: {
        opacity: 0.85
    },
    audio: {
        width:'100%'
    }
}


export class AlbumComponent extends React.Component<RouteComponentProps<{}>, {}>{
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className='bakcground-img-style sections' style={style.background}>
                <div className='col-12'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className="col-11 col-sm-9">
                                <Card style={style.card}>
                                    <CardMedia>
                                        <img style={style.bigCover} src="/img/sampleBackground.jpg" />
                                    </CardMedia>

                                    <CardTitle
                                        title="Album title"
                                        actAsExpander={true}
                                        showExpandableButton={true}
                                    />
                                    <CardText expandable={true}>
                                        <CardTitle title="Description" />
                                        <CardText>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                                        in culpa qui officia deserunt mollit anim id est laborum.
                                            </CardText>
                                    </CardText>

                                    <CardText>
                                        <CardTitle title="song name"/>
                                        <audio controls style={style.audio}>
                                            <source src="" type="audio/mpeg" />
                                        </audio>
                                        <CardTitle title="song name"/>
                                        <audio controls style={style.audio}>
                                            <source src="" type="audio/mpeg" />
                                        </audio>
                                        <CardTitle title="song name"/>
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