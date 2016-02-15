/**
*  商家提现
*              [{
                  "id":  1234456,
                  "batch_no": "WD201501278895230823094",
                  "user_name": "王春",
                  "shop_name": "食品房子",
                  "amount": 12300,
                  "sub_order_count": 3,
                  "bank_account_no": "955355548523388",
                  "bank_account_name": "王弟武",
                  "bank_name": "中国农业银行",
                  "bank_address": "高新支行",
                  "created_at": "2016-01-25 10:06:11",  // 申请记录时间
                  "updated_at": "2016-01-25 10:32:11",  // 最后一次处理时间
                  "status": 2
               }]
**/
import React from "react";
import Table from "../../components/table/tables.js";
import Search from "../../components/search/search.js";
import TimeSearch from "../../components/time_search/time-search-option.js";
import Btn from "../../components/btn/btn.js";
import PageCtrlBar from "../../components/page/paging";

let WithDrawControl = React.createClass({
    getInitialState(){
        return {
            a:'a'
        }
    },
    getAlternativeBtnGroups(status){
        // 是否重新补款
        if (status == 2 || status == 5) {
            return <Btn otherClass="btn-xs" name="重新补款"/>;
        } else {
            return (
                <div>
                    <Btn otherClass="btn-xs" name="人工打款"/>&nbsp;
                    <Btn otherClass="btn-xs" name="系统代付"/>&nbsp;
                    <Btn otherClass="btn-xs" name="撤回提现"/>
                </div>
            );
        }
    },
    render(){
        var headArr = ['ID','商家信息','提现金额','订单详情','收款帐号','开户行','申请时间','打款时间','状态','操作'],
            status = ['待确认','已确认','处理中','已成功','处理失败','已撤回'],
            _this = this;
        return (
            <div className="section-withdraw">
                <div className="section-filter">
                    <form action="" className="form-inline">
                        <Search dropdownMenus={['名字','店铺名','收款名','收款帐号']}/>
                        <div className="time-search-w">
                            <TimeSearch dropdownMenus={['申请时间','打款时间']}/>
                        </div>
                        <div className="btn-group btn-w">
                            <Btn otherClass="btn-primary" name="全部"/>
                            <Btn name="已打款"/>
                            <Btn name="未打款"/>
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
                                        <td>{value.user_name + "(" + value.shop_name + ")"}</td>
                                        <td>{value.amount}</td>
                                        <td>{value.sub_order_count}</td>
                                        <td>{value.bank_account_no}</td>
                                        <td>{value.bank_name}</td>
                                        <td>{value.created_at}</td>
                                        <td>{value.updated_at}</td>
                                        <td>{status[ value.status - 1 ]}</td>
                                        <td>{_this.getAlternativeBtnGroups(value.status)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <PageCtrlBar maxPage={this.props.pageNum}/>
                </div>
            </div>
        );
    }
});

module.exports = WithDrawControl;