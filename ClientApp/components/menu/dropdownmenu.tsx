import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

const styles = {
  customWidth: {
    width: 200,
  },
};

interface IDropdown {
  value: number,
  isLogin: boolean,
}

export class DropdownMenu extends React.Component<any, IDropdown> {
  constructor(props: any) {
    super(props);
    this.state = { value: 1, isLogin: this.props.isLogin };
  }

  componentWillReceiveProps(nextProps: any){
    this.setState({isLogin: nextProps.isLogin})
  }

  handleChange = (event: any, index: number, value: number) => this.setState({ value });

  render() {
    return (
      <div className="menu-item-sm">
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem
            value={1} primaryText="Home"
            containerElement={<Link to="/" />}
          />
          <MenuItem
            value={2} primaryText="Albums"
            containerElement={<Link to="/albums" />}
          />
          <MenuItem
            value={3} primaryText="Artists"
            containerElement={<Link to="/artists" />}
          />
          <MenuItem
            value={4} primaryText="Songs"
            containerElement={<Link to="/songs/all" />}
          />
          {this.state.isLogin == true &&
            <MenuItem
              value={5} primaryText="Playlists"
              containerElement={<Link to="/" />}
            />
          }

        </DropDownMenu>

      </div>
    );
  }
}