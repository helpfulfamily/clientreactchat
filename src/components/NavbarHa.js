import React from 'react';
import {Navbar} from 'reactstrap';

import NavbarMenu from "./NavbarMenu";

export default class NavbarHa extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  return (
        <div>
          <Navbar color="light" light expand="md">

              <NavbarMenu externalCloseBtn={this.props.externalCloseBtn}/>

          </Navbar>
        </div>
    );
  }
}

