import * as React from 'react';
import { IconButton } from 'material-ui';
import { Redirect } from 'react-router';
import { FormEvent } from 'react';

interface Ilogout{
    returnHome:boolean
}

export class Logout extends React.Component<any,Ilogout>{
    constructor(props: any) {
        super(props);
        this.state = {returnHome:false}
    }

    logout(event: FormEvent<HTMLFormElement>){        
        fetch("api/member/logout",{
            credentials:"same-origin"
        })
        .then(response => response.json() as Promise<boolean> )
        .then(data => {
            this.setState({returnHome:true});
            this.props.Logout();
        });
        event.preventDefault();
        return false;
    }

    public render(){
        return(
            <form onSubmit={(e) => {this.logout(e)}}>
                <IconButton tooltip="logout" iconClassName="material-icons menu-icon" type="submit">
                    person_outline
                </IconButton>
                {this.state.returnHome == true && <Redirect to="/" push/>}
            </form>         
        );
    }
}