import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ProblemTitleList from "../problem/ProblemTitleList";
import SolutionTitleList from "../solution/SolutionTitleList";
import {FaQuestionCircle, FaRegLightbulb} from "react-icons/fa";
export default class ProsoTab extends React.Component {
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
            <FaQuestionCircle/> Problems
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
            >
            <FaRegLightbulb/>  Solutions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
             <ProblemTitleList/>
          </TabPane>
          <TabPane tabId="2">
            <SolutionTitleList/>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}