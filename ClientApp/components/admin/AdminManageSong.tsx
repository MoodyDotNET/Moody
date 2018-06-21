import * as React from "react";
import { TextField, FlatButton, RaisedButton, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper, DatePicker, SelectField, MenuItem, Dialog } from "material-ui";
import Song from "../../model/Song";
import Artist from "../../model/Artist";
import Album from "../../model/Album";
import Producer from "../../model/Producer";
import Category from "../../model/Category";
import { white, blue400, orange400 } from "material-ui/styles/colors";
import Tag from "../../model/Tag";
import { AdminUploadPicture } from "./AdminUploadPicture";
import { AdminUploadSong } from "./AdminUploadSong";

interface AdminManageSongState {
    songs: Song[];
    artists: Artist[];
    albums: Album[];
    categories: Category[],
    loading: boolean;
    confirming: boolean;
    selected: Song | null;
}

export class AdminManageSong extends React.Component<{}, AdminManageSongState> {
    constructor(props: {}) {
        super(props)

        this.state = { songs: [], artists: [], albums: [], categories: [], loading: true, confirming: false, selected: null };

        fetch('/api/artist/all')
            .then(response => response.json() as Promise<Artist[]>)
            .then(data => {
                this.setState({ artists: data });
            });
        fetch('/api/album/all')
            .then(response => response.json() as Promise<Album[]>)
            .then(data => {
                this.setState({ albums: data });
            });
        fetch('/api/category/all')
            .then(response => response.json() as Promise<Category[]>)
            .then(data => {
                this.setState({ categories: data });
            });
        this.reload();
    }

    private reload() {
        fetch('/api/song/all')
            .then(response => response.json() as Promise<Song[]>)
            .then(data => {
                this.setState({ songs: data, loading: false });
            });
    }

    private update(e: React.MouseEvent<{}>) {
        fetch('/api/song/update', {
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
        fetch('/api/song/delete', {
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
        fetch('/api/song/insert', {
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
            : this.renderSongs();

        return (
            <div>
                <div>
                    <h2>Manage Song</h2>
                </div>
                { this.state.selected != null &&
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <AdminUploadPicture filename={`img/song/${this.state.selected.songCode}.jpg`} />
                        </div>
                        <div className="col-md-6">
                            <AdminUploadSong filename={`mp3/${this.state.selected.songCode}.mp3`} />
                        </div>
                    </div>
                </div> }
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
                                        {this.state.albums.map(album => <MenuItem value={album.albumId} primaryText={album.albumName} />)}
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
                                        {this.state.artists.map(artist => <MenuItem value={artist.artistCode} primaryText={artist.firstName + ' ' + artist.middleName + ' ' + artist.lastName} />)}
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
                                        {this.state.artists.map(artist => <MenuItem value={artist.artistCode} primaryText={artist.firstName + ' ' + artist.middleName + ' ' + artist.lastName} />)}
                                    </SelectField>
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
                                        value={this.state.selected != null ? this.state.selected.lyric : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Song,
                                                lyric: v
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
                            <tr>
                                <td>Categories</td>
                                <td>
                                    <SelectField 
                                    floatingLabelText="Categories" 
                                    multiple
                                    value={this.state.selected != null ? this.state.selected.tag.map(tag => tag.tagCode) : ''} 
                                    onChange={(e, i, v) => {
                                        let selectedTags : Tag[] = [];
                                        (v as number[]).forEach((e, i) => {
                                            selectedTags.push({
                                                songCode: this.state.selected != null ? this.state.selected.songCode : -1,
                                                tagCode: v[i]
                                            })
                                        })
                                        this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Song,
                                                tag: selectedTags
                                            }
                                        }))
                                    }}>
                                        {this.state.categories.map(category => <MenuItem value={category.tagCode} primaryText={category.tagName} />)}
                                    </SelectField>
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
                {this.renderConfirm()}
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
                        <TableHeaderColumn>Artist</TableHeaderColumn>
                        <TableHeaderColumn>Album</TableHeaderColumn>
                        <TableHeaderColumn>Composer</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false}>
                {this.state.songs.map(song =>
                    <TableRow key={ song.songCode } selected={ song == this.state.selected }>
                        <TableRowColumn>{ song.title }</TableRowColumn>
                        <TableRowColumn>{ song.contributingArtist != null ? song.contributingArtistNavigation.firstName + ' ' + song.contributingArtistNavigation.middleName + ' ' + song.contributingArtistNavigation.lastName : '' }</TableRowColumn>
                        <TableRowColumn>{ song.album != null ? song.album.albumName : '' }</TableRowColumn>
                        <TableRowColumn>{ song.composerNavigation != null ? song.composerNavigation.firstName + ' ' + song.composerNavigation.middleName + ' ' + song.composerNavigation.lastName : '' }</TableRowColumn>
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
                { this.state.selected != null ? 'Are you sure you want to delete song "' + this.state.selected.title + '"' : 'No song selected!'}
              </Dialog>
            </div>
        );
    }
}
