import * as React from "react";
import { TextField, RaisedButton, Avatar, FlatButton } from "material-ui";
import { FormEvent } from "react";
import Administrator from "../../model/Administrator";

interface AdminManageProfileProp {
    changeAvatar: Function
    admin: Administrator,
    refresh: Function
}

interface AdminManageProfileState {
    avatarSrc: string,
    reader: FileReader,
    admin: Administrator,
    loading: boolean,
    msg: string
}

export class AdminManageProfile extends React.Component<AdminManageProfileProp, AdminManageProfileState> {
    constructor(props: AdminManageProfileProp) {
        super(props);
        this.state = {avatarSrc: `img/admin/${this.props.admin.userId}.jpg`, reader: new FileReader(), admin: this.props.admin, loading: false, msg: ''}
        this.state.reader.onload = (e: any) => {
            this.setState({
                avatarSrc: e.target!.result
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
        this.setState({loading: true});
        formdata.append('filename', `img/admin/${this.props.admin.userId}.jpg`);
        formdata.append('thefile', fileField.files[0]);
        fetch('/api/upload', {
            method: 'PUT',
            body: formdata
            })
            .then(res => {
                this.setState({loading: false, msg: 'Avatar uploaded successfully'});
                this.props.changeAvatar(this.state.avatarSrc);
            });
        e.preventDefault();
        return false;
    }

    private update(e: React.MouseEvent<{}>) {
        fetch('/api/admin/update', {
            method: 'PUT',
            body: JSON.stringify(this.state.admin),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
        this.props.refresh();
    }

    public render() {
        return (
            <div>
                <div>
                    <h2>Manage account</h2>
                </div>
                <div>
                    <form onSubmit= { (e) => this.upload(e) }>
                        <input id="thefile" type="file" style={{display: 'none'}}/>         
                        <Avatar 
                            src={this.state.avatarSrc}
                            size={140} 
                            style={{display: 'block', marginBottom: 10, cursor: "pointer"}} 
                            onClick={() => this.changeImg()} />
                        { !this.state.loading && <RaisedButton type="Submit" label='Upload avatar' /> }
                        { this.state.loading && <RaisedButton type="Submit" label='Uploading...' disabled /> }
                        { this.state.msg }
                    </form>
                </div>
                <div>
                    <TextField 
                        hintText="First name" 
                        value={this.state.admin.firstName} 
                        onChange={ (e, v) => this.setState(prev => ({
                            admin: {
                                ...prev.admin as Administrator,
                                firstName: v
                            }
                        }))} />
                    <TextField 
                        hintText="Middle name" 
                        value={this.state.admin.middleName} 
                        onChange={ (e, v) => this.setState(prev => ({
                            admin: {
                                ...prev.admin as Administrator,
                                middleName: v
                            }
                        }))} />
                    <TextField 
                        hintText="Last name" 
                        value={this.state.admin.lastName} 
                        onChange={ (e, v) => this.setState(prev => ({
                            admin: {
                                ...prev.admin as Administrator,
                                lastName: v
                            }
                        }))} />
                </div>
                <div>
                    <RaisedButton label="Update my profile" onClick={(e) => this.update(e)}></RaisedButton>
                </div>
            </div>
        );
    }
}