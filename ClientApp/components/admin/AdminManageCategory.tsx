import * as React from "react";
import { TextField, FlatButton, RaisedButton, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper, DatePicker, SelectField, MenuItem } from "material-ui";
import Song from "../../model/Song";
import Artist from "../../model/Artist";
import Album from "../../model/Album";
import Producer from "../../model/Producer";
import Category from "../../model/Category";
import { blue100, orange400, blue400, white } from "material-ui/styles/colors";

interface AdminManageCategoryState {
    categories: Category[];
    loading: boolean;
    selected: Category | null;
}

export class AdminManageCategory extends React.Component<{}, AdminManageCategoryState> {
    constructor(props: {}) {
        super(props)

        this.state = { categories: [], loading: true, selected: null };

        this.load();
    }

    private load() {
        fetch('/api/category/all')
            .then(response => response.json() as Promise<Category[]>)
            .then(data => {
                this.setState({ categories: data, loading: false });
            });
    }

    private update(e: React.MouseEvent<{}>) {
        fetch('/api/category/update', {
            method: 'PUT',
            body: JSON.stringify(this.state.selected),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => this.load());
    }

    private delete(e: React.MouseEvent<{}>) {
        fetch('/api/category/delete', {
            method: 'DELETE',
            body: JSON.stringify(this.state.selected),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => this.load());
    }

    private insert(e: React.MouseEvent<{}>) {
        fetch('/api/category/insert', {
            method: 'POST',
            body: JSON.stringify(this.state.selected),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => this.load());
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTable();

        return (
            <div>
                <div>
                    <h2>Manage Category</h2>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <table>
                            <tr>
                                <td>Category</td>
                                <td>
                                    <TextField 
                                        hintText="Category" 
                                        value={this.state.selected != null ? this.state.selected.tagName : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Category,
                                                tagName: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                        </table>
                        <RaisedButton label="Add" onClick={(e) => this.insert(e) } backgroundColor={blue400} labelColor={white}/>
                        <RaisedButton label="Update" onClick={(e) => this.update(e) } />
                        <RaisedButton label="Delete" onClick={(e) => this.delete(e) } backgroundColor={orange400} labelColor={white}/>
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
        this.setState({selected: this.state.categories[pos]})
    }
    
    private renderTable() {
        return (
            <Table onRowSelection={ (rows) => this.selectSong(rows) }>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Categories</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false}>
                {this.state.categories.map(cate =>
                    <TableRow key={ cate.tagCode } selected={ cate == this.state.selected }>
                        <TableRowColumn>{ cate.tagName }</TableRowColumn>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        );
    }
}
