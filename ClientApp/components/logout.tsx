import * as React from 'react';
import { IconButton } from 'material-ui';
import { Redirect } from 'react-router';

interface Ilogout{
    returnHome:boolean
}

export class Logout extends React.Component<{},Ilogout>{
    constructor(props: any) {
        super(props);
        this.state = {returnHome:false}
    }

    private logout(){
        fetch("api/Member/logout")
        .then(response => response.json() as Promise<boolean> )
        .then(data => {
            if(data == true){
                this.setState({returnHome:true});
                console.log("logging out");
            }
            
        })
    }

    public render(){
        return(
            <IconButton tooltip="logout" iconClassName="material-icons menu-icon">
                person_outline
                {this.state.returnHome==true && <Redirect to = "/" push/>}
            </IconButton>            
        );
    }
}