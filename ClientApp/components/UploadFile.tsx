import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Paper, Card, List, ListItem, CardActions, RaisedButton, Dialog, TextField } from 'material-ui';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';

interface UploadFileState {
    filename: string,
    formdata: FormData
}

export class UploadFile extends React.Component<RouteComponentProps<{}>, UploadFileState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { filename: '', formdata: new FormData() };
    }

    private upload(e: FormEvent<HTMLFormElement>) {
        this.setState({
            formdata: new FormData()
        });
        var fileField : any = document.querySelector("#thefile");
        this.state.formdata.append('filename', this.state.filename);
        this.state.formdata.append('thefile', fileField.files[0]);
        fetch('/api/Profile/changeImg', {
            method: 'PUT',
            body: this.state.formdata
            });
        e.preventDefault();
        return false;
    }

    public render() {
        return (
            <Dialog open={true}>                
                <h2>Upload file</h2>
                <form onSubmit= { (e) => this.upload(e) }>
                    <TextField
                        hintText="Filename"
                        floatingLabelText="Filename"
                        value={this.state.filename}
                        onChange={ (e, v) => this.setState({ filename: v }) }
                    />
                    <RaisedButton
                        containerElement='label'
                        label='Upload file'>
                        <input id="thefile" type="file" style={{display: 'none'}}/>
                    </RaisedButton>
                    <br/>
                    <div>
                        <RaisedButton label="Upload" primary={true} type="submit" /> 
                        <RaisedButton label="Cancel" containerElement={<Link to="/" />} />
                    </div>
                </form>
            </Dialog>
        );
    }
}
