import * as React from "react";
import { TextField, FlatButton, RaisedButton, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper, DatePicker, SelectField, MenuItem } from "material-ui";
import Song from "../../model/Song";

interface AdminManageSongState {
    songs: Song[];
    loading: boolean;
    selected: Song | null;
}

export class AdminManageSong extends React.Component<{}, AdminManageSongState> {
    constructor(props: {}) {
        super(props)

        this.state = { songs: [], loading: true, selected: null };

        fetch('/api/playmusic/all')
            .then(response => response.json() as Promise<Song[]>)
            .then(data => {
                this.setState({ songs: data, loading: false });
            });
    }

    private updateSong(e: React.MouseEvent<{}>) {
        console.log(this.state.selected);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSongs();

        return (
            <div>
                <div>
                    <h2>Songs management</h2>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <table>
                            <tr>
                                <td>Title</td>
                                <td>
                                    <TextField 
                                        hintText="Title" 
                                        value={this.state.selected != null ? this.state.selected.title : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Song,
                                                title: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Subtitle</td>
                                <td>
                                    <TextField 
                                        hintText="Subtitle" 
                                        value={this.state.selected != null ? this.state.selected.subtitle : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Song,
                                                subtitle: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Album</td>
                                <td>
                                    <SelectField 
                                    floatingLabelText="Album" 
                                    value={this.state.selected != null ? this.state.selected.albumId : ''} 
                                    onChange={(e, i, v) => {
                                        this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Song,
                                                albumId: v
                                            }
                                        }))
                                    }}>
                                        <MenuItem value={1} primaryText="Never" />
                                        <MenuItem value={2} primaryText="Every Night" />
                                        <MenuItem value={3} primaryText="Weeknights" />
                                        <MenuItem value={4} primaryText="Weekends" />
                                        <MenuItem value={5} primaryText="Weekly" />
                                    </SelectField>
                                </td>
                            </tr>
                            <tr>
                                <td>Artist</td>
                                <td>
                                    <SelectField 
                                    floatingLabelText="Artist" 
                                    value={this.state.selected != null ? this.state.selected.contributingArtist : ''} 
                                    onChange={(e, i, v) => {
                                        this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Song,
                                                contributingArtist: v
                                            }
                                        }))
                                    }}>
                                        <MenuItem value={1} primaryText="Never" />
                                        <MenuItem value={2} primaryText="Every Night" />
                                        <MenuItem value={3} primaryText="Weeknights" />
                                        <MenuItem value={4} primaryText="Weekends" />
                                        <MenuItem value={5} primaryText="Weekly" />
                                    </SelectField>
                                </td>
                            </tr>
                            <tr>
                                <td>Composer</td>
                                <td>
                                    <SelectField 
                                    floatingLabelText="Composer" 
                                    value={this.state.selected != null ? this.state.selected.composer : ''} 
                                    onChange={(e, i, v) => {
                                        this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Song,
                                                composer: v
                                            }
                                        }))
                                    }}>
                                        <MenuItem value={1} primaryText="Never" />
                                        <MenuItem value={2} primaryText="Every Night" />
                                        <MenuItem value={3} primaryText="Weeknights" />
                                        <MenuItem value={4} primaryText="Weekends" />
                                        <MenuItem value={5} primaryText="Weekly" />
                                    </SelectField>
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
                                                    ...prev.selected as Song,
                                                    dateReleased: date
                                                }
                                            }))
                                        } } />
                                </td>
                            </tr>
                            <tr>
                                <td>Lyric</td>
                                <td>
                                    <TextField 
                                        hintText="Lyric" 
                                        multiLine={true}
                                        value={this.state.selected != null ? this.state.selected.lyricCode : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Song,
                                                lyricCode: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Length (s)</td>
                                <td>
                                    <TextField 
                                        hintText="Length"
                                        value={this.state.selected != null ? this.state.selected.length : ''} 
                                        onChange={ (e, v) => {
                                            if (Number(v) != NaN) {
                                                this.setState(prev => ({
                                                    selected: {
                                                        ...prev.selected as Song,
                                                        length: Number(v)
                                                    }
                                                }))
                                            }
                                        } } />
                                </td>
                            </tr>
                        </table>
                        <RaisedButton label="Update" onClick={(e) => this.updateSong(e) } />
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
        this.setState({selected: this.state.songs[pos]})
    }
    
    private renderSongs() {
        return (
            <Table onRowSelection={ (rows) => this.selectSong(rows) }>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Subtitle</TableHeaderColumn>
                        <TableHeaderColumn>Rating</TableHeaderColumn>
                        <TableHeaderColumn>Date released</TableHeaderColumn>
                        <TableHeaderColumn>Length</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false}>
                {this.state.songs.map(song =>
                    <TableRow key={ song.songCode } selected={ song == this.state.selected }>
                        <TableRowColumn>{ song.title }</TableRowColumn>
                        <TableRowColumn>{ song.subtitle }</TableRowColumn>
                        <TableRowColumn>{ song.rating }</TableRowColumn>
                        <TableRowColumn>{ song.dateReleased }</TableRowColumn>
                        <TableRowColumn>{ song.length }</TableRowColumn>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        );
    }
}
