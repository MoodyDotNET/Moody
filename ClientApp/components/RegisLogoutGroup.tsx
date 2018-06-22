import * as React from 'react';
import { Logout } from './logout';
import { Register } from './Register';
import { IconButton } from 'material-ui';

interface regisOrLogin {
    islogin:boolean
}

export class RegisLogoutGroup extends React.Component<any,regisOrLogin>{
    constructor(props: any) {
        super(props);
        this.state={
            islogin:this.props.Login
        }
        
    }
    public render(){
        if(this.state.islogin == true){
            return (
                <Logout/>
            )
        }
        else return (
            <IconButton tooltip="sign up" iconClassName="material-icons menu-icon">
                person_add
            </IconButton>
        )
    }
}