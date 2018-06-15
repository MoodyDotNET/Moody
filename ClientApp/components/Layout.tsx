import * as React from 'react';
import { NavMenu } from './NavMenu';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {MoodyMenuBar} from './menu/MoodyMenuBar';
import { RouteComponentProps } from 'react-router';
import {MoodyFooter} from './MoodyFooter';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return (
            <MuiThemeProvider>
                <div className='container-fluid'>                    
                    <div className='row'>
                        {/*<div className='col-sm-3'>
                            <NavMenu />
                        </div>
                        <div className='col-sm-9'>
                            { this.props.children }
                        </div>

                        <div className='col-sm-3'>
                            <Login />
                        </div>*/}
                        <div className='col-12 no-padding-left-right navBar'>
                            <MoodyMenuBar/>
                        </div>
                        <div className='col-12 no-padding-left-right'>
                            { this.props.children }
                        </div>
                        <div className='col-12 footer'>
                            <MoodyFooter/>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
