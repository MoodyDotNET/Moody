import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import {HomeSession1} from './HomeSession1';
import {HomeSession2} from './HomeSession2';
import {HomeSession3} from './HomeSession3';
import {HomeSession4} from './HomeSession4';

export class MoodyHomeBody extends React.Component<RouteComponentProps<{}>,{}> {
    public render(){
        return(
            /*<div className='container'>
                
            </div>*/
            <div className='home'> 
                {/*cover session*/}
                <HomeSession1 />
                {/*songs session*/}
                <HomeSession2 />
                {/*albums session*/}    
                <HomeSession3 />
                {/*artist session*/} 
                <HomeSession4 />             
            </div>

        );
    }
}