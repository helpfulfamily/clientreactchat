import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Col} from 'reactstrap';
import ProblemTitleForm from "./ProblemTitleForm";
class ModalExample extends React.Component {
  constructor(props) {
    super(props);
   }

  render() {
    return (
      <div>
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} external={this.props.externalCloseBtn}>

       </Modal>
      </div>
    );
  }
}

export default ModalExample;