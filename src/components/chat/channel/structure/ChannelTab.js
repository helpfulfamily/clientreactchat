import React from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import ChannelNameList from "./ChannelNameList";
import {FaHashtag} from "react-icons/fa/index";

export default class ChannelTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
            <FaHashtag/>
            </NavLink>
          </NavItem>

        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
             <ChannelNameList/>
          </TabPane>

        </TabContent>
      </div>
    );
  }
}