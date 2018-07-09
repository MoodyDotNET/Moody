import * as React from "react";
import { TextField, RaisedButton, Avatar, FlatButton } from "material-ui";
import { FormEvent } from "react";
import Member from "../../model/Member";

interface UserManageAccountProp {
    changeAvatar: Function
    user: Member
}

interface UserManageAccountState {
    avatarSrc: string,
    reader: FileReader,
    user: Member,
    loading: boolean,
    message: string
}

export class UserManageAccount extends React.Component<UserManageAccountProp, UserManageAccountState> {
    constructor(props: UserManageAccountProp) {
        super(props);
        this.state = {avatarSrc: `img/user/${this.props.user.userId}.jpg`, reader: new FileReader(), user: this.props.user, loading: false, message: ''}
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
        this.setState({
            loading: true
        })
        var formdata = new FormData();
        var fileField : any = document.querySelector("#thefile");
        formdata.append('filename', `img/user/${this.props.user.userId}.jpg`);
        formdata.append('thefile', fileField.files[0]);
        fetch('/api/upload', {
            method: 'PUT',
            body: formdata
            })
            .then(res => {
                this.setState({
                    loading: false,
                    message: 'Avatar updated successfully!'
                })
                this.props.changeAvatar(this.state.avatarSrc);        
            });
        e.preventDefault();
        return false;
    }

    private update(e: React.MouseEvent<{}>) {
        fetch('/api/member/update', {
            method: 'PUT',
            body: JSON.stringify(this.state.user),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
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
                            { this.state.message }
                    </form>
                </div>
                <div>
                    <TextField 
                        hintText="First name" 
                        value={this.state.user.firstName} 
                        onChange={ (e, v) => this.setState(prev => ({
                            user: {
                                ...prev.user as Member,
                                firstName: v
                            }
                        }))} />
                    <TextField 
                        hintText="Middle name" 
                        value={this.state.user.middleName} 
                        onChange={ (e, v) => this.setState(prev => ({
                            user: {
                                ...prev.user as Member,
                                middleName: v
                            }
                        }))} />
                    <TextField 
                        hintText="Last name" 
                        value={this.state.user.lastName} 
                        onChange={ (e, v) => this.setState(prev => ({
                            user: {
                                ...prev.user as Member,
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