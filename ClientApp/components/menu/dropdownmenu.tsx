import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Home" />
          <MenuItem value={2} primaryText="Albums" />
          <MenuItem value={3} primaryText="Artists" />
          <MenuItem value={4} primaryText="Songs" />
          <MenuItem value={5} primaryText="Playlists" />
        </DropDownMenu>
        
      </div>
    );
  }
}