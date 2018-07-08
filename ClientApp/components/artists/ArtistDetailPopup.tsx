import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText, RaisedButton, CardActions } from 'material-ui';

interface IArtistPopup {
    artistInfo:any,
}

const style = {
    cover:{
        height: '50vh',
    }
}

export class ArtistDetailPopup extends React.Component<any,IArtistPopup>{
    constructor(props:any){
        super(props);
        this.state = {artistInfo:this.props.artistInfo}
    }

    public render(){
        return(
            <div className="row artist">
                <div className="col-6">
                    <Card>
                        <CardMedia>
                            <img style={style.cover} src={`/img/artist/${this.state.artistInfo.artistCode}.jpg`} />
                        </CardMedia>
                    </Card>
                </div>
                <div className="col-6">
                    <Card>
                        <CardText>
                            <strong>Name: </strong>
                            {`${this.state.artistInfo.firstName} ${this.state.artistInfo.lastName}`}
                            <br />
                            <strong>Date of birth: </strong>
                            {this.state.artistInfo.birthDate}
                            <br />
                            <strong>Introduction: </strong>
                            {this.state.artistInfo.introduce}
                        </CardText>
                        <CardActions>
                            <RaisedButton
                                label="Read more"
                                primary={true}
                                containerElement={
                                    <Link to={`/artist/${this.state.artistInfo.artistCode}`}/>
                                }
                                className="btn"
                            />
                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }
}