import * as React from 'react';
import { IconButton } from 'material-ui';
import { blueGrey50 } from 'material-ui/styles/colors';

const style = {
    image:{
        height:'40px',
    }
}

export class MoodyFooter extends React.Component<{}>{
    public render() {
        return (
            <div className='container' style={{fontFamily: "Roboto, sans-serif", fontSize: 10, textAlign: "center"}}>
                <div className='row'>
                    <div className='col-4'>
                        <img style={style.image} src='/img/logo/dotnet-core.png' />
                        <img style={style.image} src='/img/logo/sql-server.png' />
                        <img style={style.image} src='/img/logo/reactjs.png' />
                        <img style={style.image} src='/img/logo/material-ui.svg' />
                    </div>
                    <div className='col-4 copyright'>
                        <span className='icon'>&#169; </span>Moody Music App
                    </div>
                    <div className='col-4 developer'>
                            PhatNH<br/>
                            DuongPTHSE<br/>
                            NhatLM<br/>
                    </div>
                    
                </div>
            </div>
        )
    }
}