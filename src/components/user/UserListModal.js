/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserList from "./UserList";
import {FaEye} from "react-icons/fa";


class UserListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="link" onClick={this.toggle}><FaEye/> {this.props.currentObserverAmount} Observer(s)</Button>
        <Modal onClick={this.toggle} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader  toggle={this.toggle}>Observers</ModalHeader>
          <ModalBody>

          <UserList/>
          </ModalBody>

        </Modal>
      </div>
    );
  }
}

export default UserListModal;