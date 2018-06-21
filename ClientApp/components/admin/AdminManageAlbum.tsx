import * as React from "react";
import { TextField, FlatButton, RaisedButton, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper, DatePicker, SelectField, MenuItem, Dialog } from "material-ui";
import Song from "../../model/Song";
import Artist from "../../model/Artist";
import Album from "../../model/Album";
import Producer from "../../model/Producer";
import Category from "../../model/Category";
import { blue100, orange400, blue400, white } from "material-ui/styles/colors";
import { AdminUploadPicture } from "./AdminUploadPicture";

interface AdminManageAlbumState {
    albums: Album[];
    loading: boolean;
    selected: Album | null;
    confirming: boolean;
}

export class AdminManageAlbum extends React.Component<{}, AdminManageAlbumState> {
    constructor(props: {}) {
        super(props)

        this.state = { albums: [], loading: true, selected: null, confirming: false };

        this.reload();
    }

    private reload() {
        fetch('/api/album/all')
            .then(response => response.json() as Promise<Album[]>)
            .then(data => {
                this.setState({ albums: data, loading: false });
            });
    }

    private update(e: React.MouseEvent<{}>) {
        fetch('/api/album/update', {
            method: 'PUT',
            body: JSON.stringify(this.state.selected),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => this.reload());
    }

    private delete() {
        fetch('/api/album/delete', {
            method: 'DELETE',
            body: JSON.stringify(this.state.selected),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => this.reload());
    }

    private insert(e: React.MouseEvent<{}>) {
        fetch('/api/album/insert', {
            method: 'POST',
            body: JSON.stringify(this.state.selected),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => this.reload());
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTable();

        return (
            <div>
                <div>
                    <h2>Manage Album</h2>
                </div>
                {this.state.selected != null && <AdminUploadPicture filename={`img/album/${this.state.selected.albumId}.jpg`} />}
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <table>
                            <tr>
                                <td>Title</td>
                                <td>
                                    <TextField 
                                        hintText="Title" 
                                        value={this.state.selected != null ? this.state.selected.albumName : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Album,
                                                albumName: v
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
                                        hintText="Change released date" 
                                        mode="landscape"
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
                        <RaisedButton label="Add" onClick={(e) => this.insert(e) } backgroundColor={blue400} labelColor={white}/>
                        <RaisedButton label="Update" onClick={(e) => this.update(e) } />
                        <RaisedButton label="Delete" onClick={(e) => this.setState({confirming: true}) } backgroundColor={orange400} labelColor={white}/>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <Paper style={{padding: "50px"}}>
                            { contents }
                        </Paper>
                    </div>
                </div>
                { this.renderConfirm() }
            </div>
        );
    }

    private selectRow(rows: number[] | "all") {
        var pos : number = rows[0] as number;
        this.setState({selected: this.state.albums[pos]})
    }
    
    private renderTable() {
        return (
            <Table onRowSelection={ (rows) => this.selectRow(rows) }>
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
                        <TableRowColumn>{ album.albumName }</TableRowColumn>
                        <TableRowColumn>{ album.genre }</TableRowColumn>
                        <TableRowColumn>{ album.dateReleased }</TableRowColumn>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        );
    }

    private confirmYes() {
        this.delete();
        this.setState({confirming: false});
    }

    private confirmNo() {
        this.setState({confirming: false});        
    }

    private renderConfirm() {
        const actions = [
            <FlatButton
              label="Yes"
              primary={true}
              onClick={() => this.confirmYes()}
            />,
            <FlatButton
              label="No"
              primary={true}
              keyboardFocused={true}
              onClick={() => this.confirmNo()}
            />,
          ];

        return (
            <div>
              <Dialog
                title="Confirm"
                actions={actions}
                modal={false}
                open={this.state.confirming}
                onRequestClose={() => this.setState({confirming: false})}
              >
                { this.state.selected != null ? 'Are you sure you want to delete album "' + this.state.selected.albumName + '"' : 'No album selected!'}
              </Dialog>
            </div>
          );
    }
}
