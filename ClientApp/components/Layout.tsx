import * as React from 'react';
import { NavMenu } from './NavMenu';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {MoodyMenuBarSM} from './MoodyMenuBarSM';
import {MoodyMenuBar} from './MoodyMenuBar';
import {MoodyHomeBody} from './MoodyHomeBody';
import {Login} from './login';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return (
            <MuiThemeProvider>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-3'>
                            <NavMenu />
                        </div>
                        <div className='col-sm-9'>
                            { this.props.children }
                        </div>

                        <div className='col-sm-3'>
                            <Login />
                        </div>
                        
                        
                        <div className='col-sm-12 hidden-sm-up'>
                            <MoodyMenuBarSM />
                        </div>
                        
                        <div className='col-sm-12 hidden-sm-down'>
                            <MoodyMenuBar />
                        </div>

                        <div className='col-sm-12 hidden-sm-down section1'>
                            <MoodyHomeBody />
                        </div>

                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
