/**
 * 商家提现单条数据明细
 *
 * */

import React from "react";

let TrInfo = React.createClass({
    render(){
        return (
            <div className="info-w">
                <h3 className="info-title">
                    {"ID:" + this.props.infoFlag.id }
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    { this.props.infoFlag.user_name + "(" + this.props.infoFlag.shop_name + ")" }
                </h3>
                <div className="info-main-w">
                    <p>asdsd</p>
                </div>
            </div>
        )
    }
});

export default TrInfo;