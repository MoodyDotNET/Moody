import * as React from "react";
import { TextField, FlatButton, RaisedButton, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper, DatePicker, SelectField, MenuItem } from "material-ui";
import Song from "../../model/Song";
import Artist from "../../model/Artist";
import Album from "../../model/Album";
import Producer from "../../model/Producer";
import Category from "../../model/Category";
import { blue100, orange400, blue400, white } from "material-ui/styles/colors";

interface AdminManageAlbumState {
    albums: Album[];
    loading: boolean;
    selected: Album | null;
}

export class AdminManageAlbum extends React.Component<{}, AdminManageAlbumState> {
    constructor(props: {}) {
        super(props)

        this.state = { albums: [], loading: true, selected: null };

        fetch('/api/album/all')
            .then(response => response.json() as Promise<Album[]>)
            .then(data => {
                this.setState({ albums: data, loading: false });
            });
    }

    private updateAlbum(e: React.MouseEvent<{}>) {
        fetch('/api/album/update', {
            method: 'PUT',
            body: JSON.stringify(this.state.selected),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }

    private addAlbum(e: React.MouseEvent<{}>) {
        fetch('/api/album/insert', {
            method: 'POST',
            body: JSON.stringify(this.state.selected),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderAlbums();

        return (
            <div>
                <div>
                    <h2>Manage Album</h2>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <table>
                            <tr>
                                <td>Title</td>
                                <td>
                                    <TextField 
                                        hintText="Title" 
                                        value={this.state.selected != null ? this.state.selected.album1 : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Album,
                                                album1: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Genre</td>
                                <td>
                                    <TextField 
                                        hintText="Subtitle" 
                                        value={this.state.selected != null ? this.state.selected.genre : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Album,
                                                genre: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Released date</td>
                                <td>
                                    <DatePicker 
                                        style={{display: 'inline'}}
                                        hintText="Released date" 
                                        mode="landscape"
                                        value={this.state.selected != null ? this.state.selected.dateReleased : undefined}
                                        onChange={(na, date) => {
                                            this.setState(prev => ({
                                                selected: {
                                                    ...prev.selected as Album,
                                                    dateReleased: date
                                                }
                                            }))
                                        } } />
                                </td>
                            </tr>
                        </table>
                        <RaisedButton label="Add" onClick={(e) => this.addAlbum(e) } backgroundColor={blue400} labelColor={white}/>
                        <RaisedButton label="Update" onClick={(e) => this.updateAlbum(e) } />
                        <RaisedButton label="Delete" onClick={(e) => this.addAlbum(e) } backgroundColor={orange400} labelColor={white}/>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <Paper style={{padding: "50px"}}>
                            { contents }
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }

    private selectSong(rows: number[] | "all") {
        var pos : number = rows[0] as number;
        this.setState({selected: this.state.albums[pos]})
    }
    
    private renderAlbums() {
        return (
            <Table onRowSelection={ (rows) => this.selectSong(rows) }>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Genre</TableHeaderColumn>
                        <TableHeaderColumn>Date released</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false}>
                {this.state.albums.map(album =>
                    <TableRow key={ album.albumId } selected={ album == this.state.selected }>
                        <TableRowColumn>{ album.album1 }</TableRowColumn>
                        <TableRowColumn>{ album.genre }</TableRowColumn>
                        <TableRowColumn>{ album.dateReleased }</TableRowColumn>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        );
    }
}
