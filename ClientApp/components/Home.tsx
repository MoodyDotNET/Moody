import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions, FlatButton, List, ListItem } from "material-ui";
import { Link } from 'react-router-dom';


export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <Card>
                <List>
                <ListItem primaryText="Hello"></ListItem>
                <ListItem primaryText="List item 2"></ListItem>
                <ListItem primaryText="item 3"></ListItem>
                </List>
                <CardHeader
                    title="MOODY!"
                    subtitle="Music for you"
                    avatar="/material.png"
                />
                <CardMedia
                overlay={<CardTitle title="Welcome to Moody" subtitle="Powered by .NET Core" />}
                >
                <img src="/material.png" alt="" />
                </CardMedia>
                <CardTitle title="Moody!" subtitle="A project created by Duong, Phat and Nhat!" />
                <CardText>
                    To add a page, create new .tsx file in "ClientApp/components" folder.<br/>
                    To add css, edit the "ClientApp/css/site.css" file.<br/>
                    To add static resource (jpg, png, mp3, rar, zip,...) put it in wwwroot folder.
                </CardText>
                <CardActions>
                    <FlatButton label="Counter" containerElement={<Link to="/counter"></Link>} />
                    <FlatButton label="Fetch Data" containerElement={<Link to="/fetchdata"></Link>} />
                </CardActions>
            </Card>
        );
    }
}
