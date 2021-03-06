import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'reactstrap';
import PropTypes from 'prop-types'
import '../style/channeltitle.css';
import ThankcoinPanel from "../../../thankcoin/structure/ThankcoinPanel";
import {getTransaction} from "../../../thankcoin/process/TransactionProcess";

/*
Kanal listesinin componentidir.
Kanal listesi ile ilgili işlemler bu component üzerinden yapılır.
 */

class ChannelNameList extends Component {





     /* render() methodu React yaşam döngüsü fonksiyonlarındandır.
         Render şu anlamda kullanılan bir kelimedir: Örn. HTML etiketleri olarak yazılmış bir kodun
         kullanıcı ekranlarında, etkileşim içine girilebilecek buttonlara, yazı kutularına dönüştürülme işlemidir.

      */
    render() {

         // Yükleme hatası olursa döndürelecek bir mesaj belirtilmiştir.

        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }



        // Yükleme hatası olmamışsa, yüklenene kadar gösterilen yazı.

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }


        /* Yükleme sırasında döndürülecek mesaj belirtilmiştir.  */

        var list = "";

        /*
          Bu if içerisinde:

            (kullanıcı tanımlanmış mı?
              && kullanıcının kanal listesi tanımlanmış mı?
              && kullanıcının kanal listesinin boyutu 0'dan büyük mü?)

          eğer bu şartları sağlıyorsa, map() methodu ile döngü oluşturulur ve kanallar listelenir.
         */

        if (typeof this.props.loginUser !== "undefined"
            && typeof this.props.loginUser.channels !== "undefined"
            && this.props.loginUser.channels.length > 0) {


            list = <ListGroup className="problemtitle">
                {this.props.loginUser.channels.map((item, index) => (
                    <ListGroupItem key={item.id}> <Link to={{
                        pathname: '/channelcontents/' + encodeURIComponent(item.name),
                        state: {
                            name: item.name
                        }
                    }}> #{item.name}</Link>


                        <ThankcoinPanel transaction={getTransaction(this.props.loginUser.username, item.id, "Channel" , item.name)}
                                        currentThankAmount={item.currentThankAmount}/>

                    </ListGroupItem>
                ))}

            </ListGroup>;




        }

        return (
            <div>
            {list}
            </div>
        );
    }
}

ChannelNameList.propTypes = {
    loginUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.userInformationReducer
    };
};

export default connect(mapStateToProps, {
} )(ChannelNameList);