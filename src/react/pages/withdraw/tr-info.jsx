/**
 * 商家提现单条数据明细
 *
 * */

import React from "react";
import Table from "../../components/table/tables.js";

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
                </div>
            </div>
        )
    }
});

export default TrInfo;