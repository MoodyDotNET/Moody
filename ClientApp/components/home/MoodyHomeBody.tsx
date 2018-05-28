import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import {HomeSession1} from './HomeSession1';
import {HomeSession2} from './HomeSession2';
import {HomeSession3} from './HomeSession3';

export class MoodyHomeBody extends React.Component<RouteComponentProps<{}>,{}> {
    public render(){
        return(
            /*<div className='container'>
                
            </div>*/
            <div className='row home'> 
                <HomeSession1 />
                <HomeSession2 />    
                <HomeSession3 />                  
            </div>

        );
    }
}