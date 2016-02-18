/**
*  已收款
*
**/
import React from "react";
import DepositTableControl from "./table-control.jsx";

let Deposit = React.createClass({
    getInitialState(){
        return {
            data: [],
            pageNum: "",
            currentPage: 1
        };
    },
    componentDidMount(){
        this.getDepositData({status: 2,page: 1});
    },
    getDepositData(param){
        let server = H.server,
            obj = param || {},
            defaultParam = {
                date_begin : $('#deposit_startTime').val(),
                date_end : $('#deposit_endTime').val()
            },
            params = Object.assign(defaultParam,obj);
        this.setState({
            currentPage: param.page
        },()=>{
            server.deposit_order_list(params,(res)=>{
                console.log(res);
                if (res.code == 0) {
                    this.setState({
                        data: res.data,
                        pageNum: Math.ceil(res.total_count/40)
                    });
                } else {
                    H.Modal(res.message);
                }
            });
        });

    },
    render(){
        return (
            <DepositTableControl getData={this.getDepositData} currentPage={this.state.currentPage}  pageNum={this.state.pageNum} data={this.state.data}/>
        );
    }
});

module.exports = Deposit;