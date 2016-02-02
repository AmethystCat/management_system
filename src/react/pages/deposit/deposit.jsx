/**
*  已收款
*
**/
import React from "react";
import DepositTableControl from "./table-control.jsx";

let Deposit = React.createClass({
    getInitialState(){
        return {
            data: [
                {
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
                },
                {
                    "id":  1234456,
                    "main_order_no": "12320160127132112346",
                    "buyer_name": "张仕杰",
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
                },
                {
                    "id":  1234456,
                    "main_order_no": "12320160127132112347",
                    "buyer_name": "胡小宇",
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
                },
                {
                    "id":  1234456,
                    "main_order_no": "12320160127132112348",
                    "buyer_name": "李四",
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
                }
            ]
        };
    },
    componentWillMount(){
        //let server = H.server;
        //server.deposit_order_list({},function(res){
        //    console.log(res);
        //    if (res.code == 0) {
        //        this.setState({data:res.data}, function () {
        //            console.log(this.state.data);
        //        });
        //    } else {
        //        H.Modal(res.message);
        //    }
        //}.bind(this));
    },
    render(){
        return (
            <DepositTableControl data={this.state.data}/>
        );
    }
});

module.exports = Deposit;