import * as React from "react";
import { TextField, FlatButton, RaisedButton, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper, DatePicker, SelectField, MenuItem, Dialog } from "material-ui";
import Song from "../../model/Song";
import Artist from "../../model/Artist";
import Album from "../../model/Album";
import Producer from "../../model/Producer";
import Category from "../../model/Category";
import { blue400, white, orange400 } from "material-ui/styles/colors";
import { AdminUploadPicture } from "./AdminUploadPicture";

interface AdminManageArtistState {
    artists: Artist[];
    producers: Producer[];
    loading: boolean;
    confirming: boolean;
    selected: Artist | null;
}

export class AdminManageArtist extends React.Component<{}, AdminManageArtistState> {
    constructor(props: {}) {
        super(props)

        this.state = { artists: [], producers: [], loading: true, selected: null, confirming: false };


        fetch('/api/producer/all')
            .then(response => response.json() as Promise<Producer[]>)
            .then(data => {
                this.setState({ producers: data, loading: false });
            });
        this.reload();
    }

    private reload() {
        fetch('/api/artist/all')
            .then(response => response.json() as Promise<Artist[]>)
            .then(data => {
                this.setState({ artists: data, loading: false });
                console.log("manage artist: "+data);
            });
    }

    private update(e: React.MouseEvent<{}>) {
        fetch('/api/artist/update', {
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
        fetch('/api/artist/delete', {
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
        fetch('/api/artist/insert', {
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
                    <h2>Manage Artist</h2>
                </div>
                {this.state.selected != null && <AdminUploadPicture filename={`img/artist/${this.state.selected.artistCode}.jpg`} />}
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <table>
                            <tr>
                                <td>First Name</td>
                                <td>
                                    <TextField 
                                        hintText="Firstname" 
                                        value={this.state.selected != null ? this.state.selected.firstName : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Artist,
                                                firstName: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Middle Name</td>
                                <td>
                                    <TextField 
                                        hintText="Title" 
                                        value={this.state.selected != null ? this.state.selected.middleName : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Artist,
                                                middleName: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>
                                    <TextField 
                                        hintText="Title" 
                                        value={this.state.selected != null ? this.state.selected.lastName : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Artist,
                                                lastName: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Biography</td>
                                <td>
                                    <TextField 
                                        hintText="Biography" 
                                        value={this.state.selected != null ? this.state.selected.biography : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Artist,
                                                biography: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Introduce</td>
                                <td>
                                    <TextField 
                                        hintText="Introduce" 
                                        value={this.state.selected != null ? this.state.selected.introduce : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Artist,
                                                introduce: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Band</td>
                                <td>
                                    <SelectField 
                                    floatingLabelText="Band" 
                                    value={this.state.selected != null ? this.state.selected.band : ''} 
                                    onChange={(e, i, v) => {
                                        this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Artist,
                                                band: v
                                            }
                                        }))
                                    }}>
                                        {this.state.artists.map(artist => <MenuItem value={artist.artistCode} primaryText={artist.firstName + ' ' + artist.middleName + ' ' + artist.lastName} />)}
                                    </SelectField>
                                </td>
                            </tr>
                            <tr>
                                <td>Producer</td>
                                <td>
                                    <SelectField 
                                    floatingLabelText="Producer" 
                                    value={this.state.selected != null ? this.state.selected.producerCode : ''} 
                                    onChange={(e, i, v) => {
                                        this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Artist,
                                                producerCode: v
                                            }
                                        }))
                                    }}>
                                        {this.state.producers.map(producer => <MenuItem value={producer.producerCode} primaryText={producer.companyName} />)}
                                    </SelectField>
                                </td>
                            </tr>
                            <tr>
                                <td>Birthday</td>
                                <td>
                                    <DatePicker 
                                        style={{display: 'inline'}}
                                        hintText="Change birthday" 
                                        mode="landscape"
                                        onChange={(na, date) => {
                                            this.setState(prev => ({
                                                selected: {
                                                    ...prev.selected as Artist,
                                                    birthDate: date
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
                    {this.renderConfirm()}
                </div>
            </div>
        );
    }

    private selectSong(rows: number[] | "all") {
        var pos : number = rows[0] as number;
        this.setState({selected: this.state.artists[pos]})
    }
    
    private renderTable() {
        return (
            <Table onRowSelection={ (rows) => this.selectSong(rows) }>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Producer</TableHeaderColumn>
                        <TableHeaderColumn>Introduce</TableHeaderColumn>
                        <TableHeaderColumn>Birthday</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false}>
                {this.state.artists.map(artist =>
                    <TableRow key={ artist.artistCode } selected={ artist == this.state.selected }>
                        <TableRowColumn>{ artist.firstName + ' ' + artist.middleName + ' ' + artist.lastName }</TableRowColumn>
                        <TableRowColumn>{ artist.producerCodeNavigation != null ? artist.producerCodeNavigation.companyName : '' }</TableRowColumn>
                        <TableRowColumn>{ artist.introduce }</TableRowColumn>
                        <TableRowColumn>{ artist.birthDate }</TableRowColumn>
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
                { this.state.selected != null ? 'Are you sure you want to delete artist "' + this.state.selected.firstName + '"' : 'No artist selected!'}
              </Dialog>
            </div>
        );
    }
}
