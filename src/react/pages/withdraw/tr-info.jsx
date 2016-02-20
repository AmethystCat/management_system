/**
 * 商家提现单条数据明细
 *
 * */

import React from "react";
import Table from "../../components/table/tables.js";

let TrInfo = React.createClass({
    propTypes: {
        infoData: React.PropTypes.array,
        infoFlag: React.PropTypes.object
    },
    render(){
        let headArr = ['收款ID','订单ID','买家信息','商品','总价(元)','付款方式','确认人','日志'];
        return (
            <div className="info-w">
                <h3 className="info-title">
                    {"ID:" + this.props.infoFlag.id }
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    { this.props.infoFlag.user_name + "(" + this.props.infoFlag.shop_name + ")" }
                </h3>
                <div className="info-main-w">
                    <Table titles={headArr}>
                        <tbody>
                        {this.props.infoData.map((el,index)=>{
                            return (
                                <tr key={'order_info_' + index}>
                                    <td>{el.pay_id}</td>
                                    <td>{el.order_no}</td>
                                    <td>{el.buy_name + "(" + el.shop_name + ")"}</td>
                                    <td>{el.goods_name}</td>
                                    <td>{H.priceSwitch(el.total_price)}</td>
                                    <td>{el.order_pay_way}</td>
                                    <td>{el.withdraw_order_applicant}</td>
                                    <td>
                                        <div>下单时间：{el.order_create_time}</div>
                                        <div>付款时间：{el.order_pay_time}</div>
                                        <div>退款：{H.priceSwitch(el.order_refund_money) + "元"}</div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
});

export default TrInfo;