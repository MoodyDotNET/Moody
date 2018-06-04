import * as React from 'react';

const style={
    background:{
        backgroundImage: 'URL("/img/HomeBackground.jpg")',
    }    
}

export class HomeSession1 extends React.Component<{},{}>{
    public render(){
        return (
            <div className='col-12 section1'>
                <div className='row justify-content-center'>
                    <div className='background' style={style.background}></div>
                    <h1 className='section1_title'>Everything is better<br/>with music</h1>
                </div>
            </div>
        );
    }
}