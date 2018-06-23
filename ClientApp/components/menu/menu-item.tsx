import * as React from 'react';
import { RaisedButton, FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';

interface Imenuitem {
    isLogin: boolean
}

var login;

export class MenuItem extends React.Component<any, Imenuitem>{
    constructor(props: any) {
        super(props);
        this.state = { isLogin: this.props.isLogin };
    }

    componentWillReceiveProps(nextProps:any){
        this.setState({isLogin:nextProps.isLogin});
    }

    public render() {

        return (
            <div className="menu-item-bg">
                <FlatButton
                    className='nav-items'
                    label='Home'
                    containerElement={<Link to="/"></Link>}

                />
                <FlatButton
                    className='nav-items'
                    label='Albums'
                    containerElement={<Link to="/albums"></Link>}

                />
                <FlatButton
                    className='nav-items'
                    label='Artists'
                    containerElement={<Link to="/artists"></Link>}

                />
                <FlatButton
                    className='nav-items'
                    label='Songs'
                    containerElement={<Link to="/songs/all"></Link>}

                />
                {this.state.isLogin == true &&
                    <FlatButton
                        className='nav-items'
                        label='Playlists'
                        containerElement={<Link to="/"></Link>}

                    />
                }

            </div>
        );
    }
}