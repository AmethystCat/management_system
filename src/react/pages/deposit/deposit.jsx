/**
*  已收款
*
**/
import React from "react";
import DepositTableControl from "./table-control.jsx";

let Deposit = React.createClass({
    getInitialState(){
        return {
            data: []
        };
    },
    componentWillMount(){
        let server = H.server;
        server.deposit_order_list({},(res)=>{
            console.log(res);
            if (res.code == 0) {
                this.setState({data:res.data});
            } else {
                H.Modal(res.message);
            }
        });
    },
    render(){
        return (
            <DepositTableControl data={this.state.data}/>
        );
    }
});

module.exports = Deposit;