import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Paper, Card, List, ListItem, CardActions, RaisedButton, Dialog, TextField, Avatar } from 'material-ui';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';
import { orange400, white } from 'material-ui/styles/colors';

interface UploadFileState {
    src: string,
    popup: boolean
}

interface UploadFileProp {
    filename: string
}

export class AdminUploadSong extends React.Component<UploadFileProp, UploadFileState> {
    constructor(props: UploadFileProp) {
        super(props);
        this.state = { src: 'Select .mp3 file', popup: false };
    }

    private upload(e: FormEvent<HTMLFormElement>) {
        var formdata = new FormData();
        var fileField : any = document.querySelector("#soundfile");
        console.log(this.props.filename);
        formdata.append('filename', this.props.filename);
        formdata.append('thefile', fileField.files[0]);
        fetch('/api/upload', {
            method: 'PUT',
            body: formdata
            })
            .then(() => {
                this.setState({popup: true})
            });
        e.preventDefault();
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
                        containerElement='label'
                        label={this.state.src}>
                        <input 
                            id="soundfile" 
                            type="file" 
                            style={{display: 'none'}}
                            onChange={(e) => this.setState({src: e.target.files![0].name})}
                            />
                    </RaisedButton>
                    <RaisedButton label="Update Music" backgroundColor={orange400} labelColor={white} type="submit" /> 
                </form>
                
                <Dialog
                    title="Success"
                    modal={false}
                    open={this.state.popup}
                    onRequestClose={() => this.setState({popup: false})}
                >
                    Sound file has been updated!
                </Dialog>
            </div>
        );
    }
}
