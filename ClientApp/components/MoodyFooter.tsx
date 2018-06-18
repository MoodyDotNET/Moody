import * as React from 'react';
import { IconButton } from 'material-ui';
import { blueGrey50 } from 'material-ui/styles/colors';

const style = {
    image:{
        width:'40px',
        height:'40px',
        margin:'1px 15px',
    }
}

export class MoodyFooter extends React.Component<{}>{
    public render() {
        return (
            <div className='container'>
                <div className='row'>
                    {/* <div className='col-4'>
                        Using:<br/>
                        <img style={style.image} src='/img/reactlogo2.png' />
                        <img style={style.image} src='/img/dotnetLogo.png' />
                    </div> */}
                    <div className='col-4 copyright'>
                        <span>&#169; </span>Moody Music App
                    </div>
                    <div className='col-8 developer'>
                        Create by: 
                            <span className='icon'>&#9786;</span> Phat
                            <span className='icon'>&#9786;</span> Duong
                            <span className='icon'>&#9786;</span> Nhat
                    </div>
                    
                </div>
            </div>
        )
    }
}