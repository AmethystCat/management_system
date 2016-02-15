/**
*  已收款
*              [{
                "id":  1234456,
                "main_order_no": "12320160127132112345",
                "buyer_name": "张工",
                "shop_name": "食品房子",
                "pay_amount": 12300,
                "order_amount": 12800,
                "deduct_amount": 500,
                "pay_channel": 1,
                "money_place": 1,
                "order_operator_name": "晓欣",
                "updated_at": "2016-01-25 10:32:11",
                "status": 2,
                "page": 1,
                "total_count": 200
               }]
**/
import React from "react";
import Table from "../../components/table/tables.js";
import Search from "../../components/search/search.js";
import TimeSearch from "../../components/time_search/time-search.js";
import Btn from "../../components/btn/btn.js";
import PageCtrlBar from "../../components/page/paging";

let DepositTableControl = React.createClass({
    getInitialState(){
        return {
            a:'a'
        }
    },
    getBack(){
        H.Modal({
            content:"确认撤回该次收款？",
            okCallback: function () {
                console.log('成功');
            }
        });
    },
    render(){
        var headArr = ['收款ID','订单ID','付款人','实收金额','订单金额','优惠减免','付款方式','确认人','资金位置','付款确认时间','操作'],
            pageNum = '1',
            pay_channel = ['打款','微信支付','支付宝'],
            money_place = ['支付宝','农行','微信'],
            _this = this;

        return (
            <div className="section-deposit">
                <div className="section-filter">
                    <form action="" className="form-inline">
                        <Search dropdownMenus={['付款人','确认人']}/>
                        <TimeSearch/>
                        <div className="btn-group btn-w">
                            <Btn otherClass="btn-primary" name="全部"/>
                            <Btn name="支付宝"/>
                            <Btn name="农行卡"/>
                            <Btn name="微信"/>
                        </div>
                    </form>
                </div>
                <div className="section-table">
                    <Table res={this.props.data} titles={headArr} types="1">
                        <tbody>
                            {this.props.data.map(function(value,index){
                                return (
                                    <tr key={'deposit_tr_'+index}>
                                        <td>{value.id}</td>
                                        <td>{value.main_order_no}</td>
                                        <td>{value.buyer_name}</td>
                                        <td>{value.pay_amount}</td>
                                        <td>{value.order_amount}</td>
                                        <td>{value.deduct_amount}</td>
                                        <td>{pay_channel[ value.pay_channel - 1 ]}</td>
                                        <td>{value.order_operator_name}</td>
                                        <td>{money_place[ value.money_place - 1 ]}</td>
                                        <td>{value.updated_at}</td>
                                        <td><Btn otherClass="btn-xs" btnEvent={_this.getBack.bind(_this,value,index)} name="撤回"/></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <PageCtrlBar maxPage={pageNum}/>
                </div>
            </div>
        );
    }
});

module.exports = DepositTableControl;