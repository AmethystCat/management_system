/**
 * Created by Administrator on 2016/2/15.
 * 汇总对账;
 * Hu Xiaoyu
 */
import React from "react";
import DropDown from "../../components/drop_down/drop-down.js";

var MoneyCheckControl = React.createClass({
    getInitialState: function () {
        return {
            data:{}
        }
    },
    componentWillMount: function () {

    },
    render: function () {
        var keyName = [
            ["实时余额","上期余额","销售入账","商家提现","退款","平台补贴","支付系统手续费","其它补贴","亏损总账"],
            ["销售入账","商品入账","累计退款","累计亏损","平台补贴","支付系统手续费","其它补贴","亏损总账"]
        ];
        return (
            <div className="row money-check">
                <div className="col-md-12">
                    <NotSettle keyName={keyName[0]} />
                    <HistoryList keyName={keyName[0]} showId="0" />
                    <HistoryList keyName={keyName[0]} showId="1" />
                    <HistoryCount keyName={keyName[1]} />
                </div>
            </div>
        )
    }
});

var Table = React.createClass({
    render: function () {
        var keyName = this.props.keyName;
        var data = this.props.dataVal;
        return (
            <table className="table table-bordered table-hover table-responsive">
                <tbody>
                    {
                        keyName.map(function (name,index){
                            return <tr key={index}><td>{name}</td><td>{data[index]}</td></tr>;
                        })
                    }
                </tbody>
            </table>
        )
    }
});

/*未结算*/
var NotSettle = React.createClass({
    getInitialState(){
        return {
            data: {},
            id: 0
        }
    },
    componentWillMount(){
        let server = H.server;
        server.not_settle({},(res)=>{
            if (res.code == 0) {
                this.setState({
                    data: res.data
                });
            } else {
                H.Modal(res.message);
            }
        });
    },
    render(){
        var data = this.state.data;
        var val = [
            H.priceSwitch(data.balance)+"元",
            H.priceSwitch(data.last_balance)+"元",
            H.priceSwitch(data.deposit_amount)+"元",
            H.priceSwitch(data.withdraw_amount)+"元",
            H.priceSwitch(data.refund_amount)+"元",
            H.priceSwitch(data.deduct_amount)+"元",
            H.priceSwitch(data.payment_fee)+"元",
            <a>填写</a>,
            H.priceSwitch(data.loss_remove)+"元"
        ];
        return (
            <div className="col-md-3">
                <div className="top">
                    <h4>未结算</h4>
                    <p>实时余额=未提现金额</p>
                    <p>只有*3621农行卡才能做结算</p>
                </div>
                <div>
                    <Table keyName={this.props.keyName} dataVal={val} />
                </div>
                <div><button type="button" className="btn btn-primary btn-lg btn-block">结算扎账</button></div>
            </div>
        )
    }
});

//历史每一期数据列表;

var HistoryList = React.createClass({
    getInitialState(){
        return {
            optionArr: [],  //下拉选择里面的选项;
            history:[], //历史数据列表;
            index: 0 //当前显示的某一期数据的ID;
        }
    },
    componentDidMount(){
        let server = H.server;
        let optionArr = [];
        let id = 0;
        server.history_data({},(res)=>{
            if(res.code == 0) {
                for(var i = 0 ; i < res.data.length ; i++) {
                    optionArr[i] = "第" + res.data[i].id + " 期结算 " + res.data[i].check_time;
                }
                if(this.props.showId == 0){
                    id = res.data.length-1;
                }else if(this.props.showId == 1) {
                    id = res.data.length-2;
                }
                this.setState({
                    optionArr: optionArr,
                    history: res.data,
                    index: id,
                    selectVal: optionArr[id]
                });
            }
        });
    },
    setData(index){
        this.setState({
            index: index
        })
    },
    render(){
        var data = this.state.history[this.state.index];
        var val = [
            H.priceSwitch(data.balance)+"元",
            H.priceSwitch(data.last_balance)+"元",
            H.priceSwitch(data.deposit_amount)+"元",
            H.priceSwitch(data.withdraw_amount)+"元",
            H.priceSwitch(data.refund_amount)+"元",
            H.priceSwitch(data.deduct_amount)+"元",
            H.priceSwitch(data.payment_fee)+"元",
            H.priceSwitch(data.other_allowance)+"元",
            H.priceSwitch(data.loss_remove)+"元"
        ];
        return (
            <div className="col-md-3">
                <div className="top">
                    <DropDown changeEv={this.setData} dropdownData={this.state.optionArr} val={this.state.index} />
                    <p>只有*3621农行卡才能做结算</p>
                </div>
                <Table keyName={this.props.keyName} dataVal={val} />
            </div>
        )
    }
});

//历史数据统计;
var HistoryCount = React.createClass({
    getInitialState(){
        return{
            data:{}
        }
    },
    componentWillMount(){
        let server = H.server;
        server.history_count({},(res)=>{
            console.log(res);
            if(res.code == 0){
                this.setState({
                    data: res.data
                })
            }
        })
    },
    setData(index){

    },
    render(){
        var optionArr = ["全部"];
        var data = this.state.data;
        var val = [
            H.priceSwitch(data.deposit_amount)+"元",
            H.priceSwitch(data.withdraw_amount)+"元",
            H.priceSwitch(data.refund_amount)+"元",
            H.priceSwitch(data.loss)+"元",
            H.priceSwitch(data.deduct_amount)+"元",
            H.priceSwitch(data.payment_fee)+"元",
            H.priceSwitch(data.other_allowance)+"元",
            H.priceSwitch(data.loss_remove)+"元"
        ];
        return (
            <div className="col-md-3">
                <div className="top row">
                    <div className="col-md-5">
                        <h4>历史数据</h4>
                    </div>
                    <div className="col-md-7">
                        <DropDown changEv={this.setData} dropdownData={optionArr} />
                    </div>
                </div>
                <Table keyName={this.props.keyName} dataVal={val} />
            </div>
        )
    }
});

module.exports = MoneyCheckControl;