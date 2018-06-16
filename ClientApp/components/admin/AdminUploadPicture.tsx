import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Paper, Card, List, ListItem, CardActions, RaisedButton, Dialog, TextField, Avatar } from 'material-ui';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';

interface UploadFileState {
    reader: FileReader,
    src: string,
    popup: boolean
}

interface UploadFileProp {
    filename: string
}

export class AdminUploadPicture extends React.Component<UploadFileProp, UploadFileState> {
    constructor(props: UploadFileProp) {
        super(props);
        this.state = { reader: new FileReader(), src: this.props.filename, popup: false };
        this.state.reader.onload = (e: any) => {
            this.setState({
                src: e.target!.result
            })
        }
    }


    private changeImg() {
        var fileField : any = document.querySelector("#thefile");
        fileField.onchange = () => {
            this.state.reader.readAsDataURL(fileField.files[0]);
        }
        fileField.click();
    }

    private upload(e: FormEvent<HTMLFormElement>) {
        var formdata = new FormData();
        var fileField : any = document.querySelector("#thefile");
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

    public componentWillReceiveProps(nextProp: UploadFileProp) {
        this.setState({src: nextProp.filename});
    }


    public render() {
        return (
            <div>                
                <form onSubmit= { (e) => this.upload(e) }>
                    <input id="thefile" type="file" style={{display: 'none'}}/>
                    <Avatar 
                            src={this.state.src}
                            size={140} 
                            style={{display: 'block', marginBottom: 10, cursor: "pointer"}} 
                            onClick={() => this.changeImg()} />
                    <RaisedButton label="Update picture" type="submit" /> 
                </form>

                <Dialog
                    title="Success"
                    modal={false}
                    open={this.state.popup}
                    onRequestClose={() => this.setState({popup: false})}
                >
                    Picture has been updated!
                </Dialog>
            </div>
        );
    }
}
