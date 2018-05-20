import * as React from 'react';
import { NavMenu } from './NavMenu';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

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
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
