import * as React from "react";
import { TextField, FlatButton, RaisedButton, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper, DatePicker, SelectField, MenuItem, Dialog } from "material-ui";
import Song from "../../model/Song";
import Producer from "../../model/Producer";
import Album from "../../model/Album";
import Category from "../../model/Category";
import { blue400, white, orange400 } from "material-ui/styles/colors";

interface AdminManageProducerState {
    producers: Producer[];
    loading: boolean;
    confirming: boolean;
    selected: Producer | null;
}

export class AdminManageProducer extends React.Component<{}, AdminManageProducerState> {
    constructor(props: {}) {
        super(props)

        this.state = { producers: [], loading: true, selected: null, confirming: false };

        this.reload();
    }

    private reload() {
        fetch('/api/producer/all')
            .then(response => response.json() as Promise<Producer[]>)
            .then(data => {
                this.setState({ producers: data, loading: false });
            });
    }

    private update(e: React.MouseEvent<{}>) {
        fetch('/api/producer/update', {
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
        fetch('/api/producer/delete', {
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
        fetch('/api/producer/insert', {
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
                    <h2>Manage Producer</h2>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <table>
                            <tr>
                                <td>Company Name</td>
                                <td>
                                    <TextField 
                                        hintText="Company Name" 
                                        value={this.state.selected != null ? this.state.selected.companyName : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Producer,
                                                companyName: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Owner</td>
                                <td>
                                    <TextField 
                                        hintText="Owner" 
                                        value={this.state.selected != null ? this.state.selected.owner : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Producer,
                                                owner: v
                                            }
                                        })) } />
                                </td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>
                                    <TextField 
                                        hintText="Address" 
                                        value={this.state.selected != null ? this.state.selected.address : ''} 
                                        onChange={ (e, v) => this.setState(prev => ({
                                            selected: {
                                                ...prev.selected as Producer,
                                                address: v
                                            }
                                        })) } />
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
        this.setState({selected: this.state.producers[pos]})
    }
    
    private renderTable() {
        return (
            <Table onRowSelection={ (rows) => this.selectSong(rows) }>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Company Name</TableHeaderColumn>
                        <TableHeaderColumn>Owner</TableHeaderColumn>
                        <TableHeaderColumn>Address</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false}>
                {this.state.producers.map(producer =>
                    <TableRow key={ producer.producerCode } selected={ producer == this.state.selected }>
                        <TableRowColumn>{ producer.companyName }</TableRowColumn>
                        <TableRowColumn>{ producer.owner }</TableRowColumn>
                        <TableRowColumn>{ producer.address }</TableRowColumn>
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
                { this.state.selected != null ? 'Are you sure you want to delete producer "' + this.state.selected.companyName + '"' : 'No producer selected!'}
              </Dialog>
            </div>
        );
    }
}
