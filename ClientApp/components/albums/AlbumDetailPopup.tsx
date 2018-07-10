import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardActions } from 'material-ui';

interface IAlbumPopup {
    AlbumInfo:any,
}

const style = {
    cover:{
        height: '50vh',
    }
}

export class AlbumDetailPopup extends React.Component<any,IAlbumPopup>{
    constructor(props:any){
        super(props);
        this.state = {AlbumInfo:this.props.albumInfo}
    }

    public render(){
        return (
            <div className="row album">
                <div className="col-6">
                    <Card>
                        <CardMedia
                        >
                            <img style={style.cover} src={`/img/album/${this.state.AlbumInfo.albumId}.jpg`} />
                        </CardMedia>
                    </Card>
                </div>
                <div className="col-6">
                    <Card>
                        <CardText>
                            <strong>Name: </strong>
                            {this.state.AlbumInfo.albumName}
                            <br />
                            <strong>Date release: </strong>
                            {(new Date(this.state.AlbumInfo.dateReleased)).toLocaleDateString()}
                            <br />
                            <strong>Genre: </strong>
                            {this.state.AlbumInfo.genre}
                        </CardText>
                        <CardActions>
                            <RaisedButton
                                label="Hear it"
                                primary={true}
                                containerElement={
                                    <Link to={`/album/${this.state.AlbumInfo.albumId}`}/>
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