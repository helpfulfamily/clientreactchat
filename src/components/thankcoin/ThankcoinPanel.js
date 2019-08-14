import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Button} from 'reactstrap';

import PropTypes from 'prop-types'
import {FaThumbsUp} from "react-icons/fa";

 /*
Thankcoin aktarma işlemi için gereken veriyi hazırlayan metot çağırılmıştır.
(sendTransaction)
 */

import {sendTransaction}  from "../common/process";

class ThankcoinPanel extends Component {

  /*
   sendTransaction metodunun bizim istediğimiz eklentilerle çalışması için öncelikle "event.preventDefault();" ile
   içeriğinin çalışması durdurulmuştur. Bu sayede sonradan eklenen kodlar ile çalışması sağlanmıştır.
   sendTransaction metoduna eklenen "(this.props.loginUser.sso.keycloak, this.props.transaction);" bu denklem
   sayesinde artık bu metot kullanıcı login olduğunda çalışacaktır.

 */
    sendTransaction(event)
    {
        event.preventDefault();

        sendTransaction(this.props.loginUser.sso.keycloak, this.props.transaction);
    }

    /*
    render içerisinde bir değişken tanımlanmıştır ve return ile bu değişken dönderilmiştir. 
     */
    render() {
        var context= <span>  <FaThumbsUp/>  {this.props.currentThankAmount}T</span>;
        if(typeof this.props.loginUser.sso !== "undefined"){
          context=         <Button color="link" onClick= {(e) => this.sendTransaction(e)} > <FaThumbsUp/>  {this.props.currentThankAmount}T</Button>;
        }
        return (
            <div>


                {context}

            </div>
        )

    }
}

ThankcoinPanel.propTypes = {
    loginUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.loginReducer
    };
};



export default connect(mapStateToProps, null)(ThankcoinPanel);
