import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'reactstrap';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import './channeltitle.css';
import ThankcoinPanel from "../thankcoin/ThankcoinPanel";

/*

Kanal listesinin componentidir.
Kanal listesi ile ilgili işlemler bu component üzerinden yapılır.


 */

class ChannelNameList extends Component {


/*

Transaction metoduna receiver ve objectID olmak üzere iki parametre girilmiştir.
Thankcoin aktarma işlemi için gereken veriyi hazırlar.
Örneğin ChannelContentList.Js içerisinde şu kod ile çağırılmıştır;

<ThankcoinPanel transaction={ this.getTransaction(content.user.username, content.id)}
currentThankAmount={content.currentThankAmount}/>


 */

    getTransaction(receiver, objectId) {

        var transaction = {
            receiver: {
                username: receiver
            },
            objectType: "Channel",
            objectId: objectId,
            name: ""
        }
        return transaction

    }



    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        /*
        Yükleme hatası olursa döndürelecek bir mesaj belirtilmiştir.

        */

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }


        /*

        Yükleme sırasında döndürülecek mesaj belirtilmiştir.

        */

        var list = "";
        var infiniteList="";
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
                        <ThankcoinPanel transaction={this.getTransaction(this.props.loginUser.username, item.id)}
                                        currentThankAmount={item.currentThankAmount}/>

                    </ListGroupItem>
                ))}
            </ListGroup>;


            infiniteList=  <InfiniteScroll
                dataLength={this.props.loginUser.channels.length}
                next={this.fetchMoreData}
                hasMore={true}
                loader={<br/>}
                scrollableTarget="scrollableDiv"
            >
                {list}
            </InfiniteScroll>;
        }

        return (
            <div>

                <div
                    id="scrollableDiv" style={{height: 700, overflow: "auto"}}>

                    {infiniteList}
                </div>
            </div>
        );
    }
}

ChannelNameList.propTypes = {
    loginUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.loginReducer
    };
};

export default connect(mapStateToProps, {
} )(ChannelNameList);
