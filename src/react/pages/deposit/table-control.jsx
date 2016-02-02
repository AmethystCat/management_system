/**
*  已收款
*
**/
import React from "react";
import Table from "../../components/table/tables.js";
import Search from "../../components/search/search.js";
import TimeSearch from "../../components/time_search/time-search.js";
import Btn from "../../components/btn/btn.js";
import PageCtrlBar from "../../components/page/paging";

let DepositTableControl = React.createClass({
    render(){
        var headArr = ['收款ID','订单ID','付款人','实收金额','订单金额','优惠减免','付款方式','确认人','资金位置','付款确认时间','操作'],
            pageNum = '1';
        return (
            <div>
                <div className="section-filter">
                    <form action="" className="form-inline">
                        <Search/>
                        <TimeSearch/>
                        <div className="btn-group btn-w">
                            <Btn name="全部"/>
                            <Btn name="支付宝"/>
                            <Btn name="农行卡"/>
                            <Btn name="微信"/>
                        </div>
                    </form>
                </div>
                <div className="section-table">
                    <Table res={this.props.data} titles={headArr} types="1"/>
                    <PageCtrlBar maxPage={pageNum}/>
                </div>
            </div>
        );
    }
});

module.exports = DepositTableControl;