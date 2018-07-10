import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardActions } from 'material-ui';
import Song from '../../model/Song'
interface ISongPopup {
    SongInfo:Song,
}

const style = {
    cover:{
        height: '50vh',
    }
}

export class SongDetailPopup extends React.Component<any,ISongPopup>{
    constructor(props:any){
        super(props);
        this.state = {SongInfo:this.props.SongInfo}
    }

    public render(){
        return (
            <div className="row songlist">
                <div className="col-6">
                    <Card>
                        <CardMedia
                        >
                            <img style={style.cover} src={`/img/song/${this.state.SongInfo.songCode}.jpg`} />
                        </CardMedia>
                    </Card>
                </div>
                <div className="col-6">
                    <Card>
                        <CardText>
                            <strong>Title: </strong>
                            {`${this.state.SongInfo.title} ${this.state.SongInfo.subtitle}`}
                            <br />
                            <strong>Date release: </strong>
                            {(this.state.SongInfo.dateReleased).toLocaleDateString()}
                            <br />
                            <strong>Artist: </strong>
                            {`${this.state.SongInfo.contributingArtistNavigation.firstName} ${this.state.SongInfo.contributingArtistNavigation.lastName}`}
                            <br/>
                            <strong>Composer: </strong>
                            {`${this.state.SongInfo.composerNavigation.firstName} ${this.state.SongInfo.composerNavigation.lastName}`}
                        </CardText>
                        <CardActions>
                            <RaisedButton
                                label="Hear it"
                                primary={true}
                                containerElement={
                                    <Link to={`/song/${this.state.SongInfo.songCode}`}/>
                                }
                                className="btn"
                            />
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}