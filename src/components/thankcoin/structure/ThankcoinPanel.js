import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Button} from 'reactstrap';

import PropTypes from 'prop-types'
import {FaThumbsUp} from "react-icons/fa";
import {getTokenForSendTransaction} from "../process/TransactionProcess";

/*
Thankcoin gönderme işlemlerinin yapıldığı paneldir.
Bu panelde Thankcoin buttonu bulunmaktadır.
Thankcoin aktarma işlemi için gereken veriyi hazırlayan metot çağırılmıştır.
(getTokenForSendTransaction)

*/
class ThankcoinPanel extends Component {

  /*
   Aşağıdaki buttona basıldığında çağrılan fonksiyondur.
   sendTransactionEvent metoduna eklenen "(this.props.loginUser.sso.keycloak, this.props.transaction);" bu denklem
   sayesinde artık bu metot kullanıcı login olduğunda çalışacaktır.

 */
    sendTransactionEvent(event)
    {
        /*
        Sayfa ilk yüklendiğinde, sanki buttona basılmış gibi getTokenForSendTransaction fonksiyonu kendiliğinden çalışıyordu.
         Bunu önlemek için, event parametresinin içerisindeki preventDefault() fonksiyonunu çağırmamız gerekir
         */
        event.preventDefault();


         // Transaction göndermek için token alıp, transaction gönderme işlemini çağıran fonksiyon.
        getTokenForSendTransaction(this.props.loginUser.sso.keycloak, this.props.transaction);
    }

    /*
    render içerisinde bir değişken tanımlanmıştır ve return ile bu değişken dönderilmiştir. 
     */
    render() {
        var context= <span>  <FaThumbsUp/>  {this.props.currentThankAmount}T</span>;
        if(typeof this.props.loginUser.sso !== "undefined"){
          context=         <Button color="link" onClick= {(e) => this.sendTransactionEvent(e)} > <FaThumbsUp/>  {this.props.currentThankAmount}T</Button>;
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
        loginUser: state.userInformationReducer
    };
};



export default connect(mapStateToProps, null)(ThankcoinPanel);
