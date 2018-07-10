import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Paper, Card, List, ListItem, CardActions, RaisedButton, Dialog, TextField, Avatar } from 'material-ui';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';
import { orange400, white } from 'material-ui/styles/colors';

interface UploadFileState {
    src: string,
    popup: boolean,
    loading: boolean,
    message: string
}

interface UploadFileProp {
    filename: string
}

export class AdminUploadSong extends React.Component<UploadFileProp, UploadFileState> {
    constructor(props: UploadFileProp) {
        super(props);
        this.state = { src: 'Select .mp3 file', popup: false, loading: false, message: '' };
    }

    private upload(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        var formdata = new FormData();
        var fileField : any = document.querySelector("#soundfile");
        if (fileField.files[0].size > 30000000) {
            this.setState({
                message: 'File must not larger than 30MB!',
                popup: true
            });
            return false;
        }
        this.setState({
            loading: true
        })
        formdata.append('filename', this.props.filename);
        formdata.append('thefile', fileField.files[0]);
        fetch('/api/upload', {
            method: 'PUT',
            body: formdata
            })
            .then(() => {
                this.setState({message: 'File has been uploaded successfully!', popup: true, loading: false})
            });
        return false;
    }

    public componentDidMount() {
        this.setState({
            src: 'Select .mp3 file'
        })
    }

    public render() {
        return (
            <div>                
                <form onSubmit= { (e) => this.upload(e) }>
                    <RaisedButton
                        disabled={this.state.loading}
                        containerElement='label'
                        label={this.state.src}>
                        <input 
                            id="soundfile" 
                            type="file" 
                            style={{display: 'none'}}
                            onChange={(e) => this.setState({src: e.target.files![0].name})}
                            />
                    </RaisedButton>
                    { !this.state.loading && <RaisedButton label="Update Music" backgroundColor={orange400} labelColor={white} type="submit" /> }
                    { this.state.loading && <RaisedButton label="Uploading music..." backgroundColor={orange400} labelColor={white} type="submit" disabled /> }
                </form>
                
                <Dialog
                    title="Message"
                    modal={false}
                    open={this.state.popup}
                    onRequestClose={() => this.setState({popup: false})}
                >
                    {this.state.message}
                </Dialog>
            </div>
        );
    }
}
