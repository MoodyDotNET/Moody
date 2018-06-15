import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, Tab, Tabs, List, ListItem, Avatar } from 'material-ui';
import { red200, black, grey200, grey900 } from 'material-ui/styles/colors';
const style = {
    bigCover: {
        height:'50vh'
    },
    overlay: {
        background:'transparent',
    },
    background: {
        background: 'URL("/img/ArtistBackground.jpg")',
        minHeight: '92.5vh'
    },
    card: {
        opacity:0.85
    },
    tabs: {
        backgroundColor: grey200,
        color:grey900
    }
}

export class ArtistComponent extends React.Component<RouteComponentProps<{}>,{}>{
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
                                <Card>
                                    <CardMedia
                                        
                                        overlay={
                                        
                                            <CardHeader 
                                                style={style.overlay} 
                                                title="artist name" 
                                                avatar={
                                                    <Avatar src="/img/ArtistBackground.jpg" size={50}/>
                                                } 
                                            />
                                        }
                                    >
                                        <img style={style.bigCover} src="/img/sampleBackground.jpg"/>
                                    </CardMedia>
                                    <CardText style={style.card}>
                                        <Tabs>
                                            <Tab label="Profile" style={style.tabs}>
                                                <Card>
                                                    <CardTitle title="profile"/>
                                                    <CardText>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                                            in culpa qui officia deserunt mollit anim id est laborum.
                                                    </CardText>
                                                </Card>
                                            </Tab>
                                            <Tab label="Album" style={style.tabs} >
                                                <List>
                                                    <ListItem
                                                        leftAvatar={<Avatar src="/img/ArtistBackground.jpg" />}
                                                        primaryText="album name"
                                                        rightIcon={
                                                            <RaisedButton
                                                                label="Hear it"
                                                                primary={true}
                                                            />
                                                        }
                                                    />
                                                    <ListItem
                                                        leftAvatar={<Avatar src="/img/ArtistBackground.jpg" />}
                                                        primaryText="album name"
                                                        rightIcon={
                                                            <RaisedButton
                                                                label="Hear it"
                                                                primary={true}
                                                            />
                                                        }
                                                    />
                                                    <ListItem
                                                        leftAvatar={<Avatar src="/img/ArtistBackground.jpg" />}
                                                        primaryText="album name"
                                                        rightIcon={
                                                            <RaisedButton
                                                                label="Hear it"
                                                                primary={true}
                                                            />
                                                        }
                                                    />
                                                </List>
                                            </Tab>
                                            <Tab label="Song" style={style.tabs}>
                                                <List>
                                                    <ListItem
                                                        leftAvatar={<Avatar src="/img/ArtistBackground.jpg" />}
                                                        primaryText="song name"
                                                        rightIcon={
                                                            <RaisedButton
                                                                label="Hear it"
                                                                primary={true}
                                                            />
                                                        }
                                                    />
                                                    <ListItem
                                                        leftAvatar={<Avatar src="/img/ArtistBackground.jpg" />}
                                                        primaryText="song name"
                                                        rightIcon={
                                                            <RaisedButton
                                                                label="Hear it"
                                                                primary={true}
                                                            />
                                                        }
                                                    />
                                                    <ListItem
                                                        leftAvatar={<Avatar src="/img/ArtistBackground.jpg" />}
                                                        primaryText="song name"
                                                        rightIcon={
                                                            <RaisedButton
                                                                label="Hear it"
                                                                primary={true}
                                                            />
                                                        }
                                                    />
                                                </List>
                                            </Tab>
                                        </Tabs>
                                    </CardText>
                                </Card>
                            </div>

                            <div className="col-11 col-sm-3">
                                <Card style={style.card}>
                                    <CardHeader title="other artists" />
                                </Card>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}