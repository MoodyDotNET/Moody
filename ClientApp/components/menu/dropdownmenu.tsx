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
    value:number
}

export class DropdownMenu extends React.Component<{},IDropdown> {
  constructor(props:any) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event:any, index:number, value:number) => this.setState({value});

  render() {
    return (
      <div className="menu-item-sm">
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem 
            value={1} primaryText="Home" 
            containerElement={<Link to="/"/>}
          />
          <MenuItem 
            value={2} primaryText="Albums" 
            containerElement={<Link to="/"/>}
          />
          <MenuItem 
            value={3} primaryText="Artists"
            containerElement={<Link to="/"/>}
          />
          <MenuItem 
            value={4} primaryText="Songs" 
            containerElement={<Link to="/songs/''"/>}
          />
          <MenuItem 
            value={5} primaryText="Playlists" 
            containerElement={<Link to="/"/>}
          />
        </DropDownMenu>
        
      </div>
    );
  }
}