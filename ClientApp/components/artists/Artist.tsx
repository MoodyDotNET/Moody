import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardHeader, Tab, Tabs, List, ListItem, Avatar } from 'material-ui';
import { red200, black, grey200, grey900 } from 'material-ui/styles/colors';
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
    tabs: {
        backgroundColor: grey200,
        color: grey900
    },
    noResult: {
        width:"50%",
        marginTop: "30vh",
        opacity:0.8
    }
}

interface IArtist {
    artist: any,
    loading: boolean
}

export class ArtistComponent extends React.Component<RouteComponentProps<{}>, IArtist>{
    constructor(props: any) {
        super(props);
        this.state = { artist: {}, loading: true }
        var param: any = this.props.match.params;
        var id: string = param.id;
        fetch(`api/artist/get?id=${id}`)
            .then(res => res.json() as Promise<any>)
            .then(data => {
                this.setState({
                    artist: data,
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
                                <Card style = {style.noResult}>
                                    <CardTitle title="Loading . . ."/>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else
            return (
                <div className='background-img-style sections' style={style.background}>
                    <div className='col-12'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className="col-11 col-sm-9">
                                    <Card>
                                        <CardMedia
                                            overlay={
                                                <CardHeader
                                                    style={style.overlay}
                                                    title={`${this.state.artist.firstName} ${this.state.artist.lastName}`}
                                                    avatar={
                                                        <Avatar src="/img/ArtistBackground.jpg" size={50} />
                                                    }
                                                />
                                            }
                                        >
                                            <img style={style.bigCover} src="/img/sampleBackground.jpg" />
                                        </CardMedia>
                                        <CardText style={style.card}>
                                            <Tabs>
                                                <Tab label="Profile" style={style.tabs}>
                                                    <Card>
                                                        <CardTitle title="profile" />
                                                        <CardText>
                                                            Date of birth: {this.state.artist.birthDate}
                                                            Band: {this.state.artist.band}
                                                            introduction: {this.state.artist.introduce}    
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