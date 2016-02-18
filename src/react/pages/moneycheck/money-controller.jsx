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
        var textRight = {
            textAlign: 'right'
        };
        return (
            <table className="table table-bordered table-hover table-responsive">
                <tbody>
                    {
                        keyName.map(function (name,index){
                            return <tr key={index}><td>{name}</td><td style={textRight}>{data[index]}</td></tr>;
                        })
                    }
                </tbody>
            </table>
        )
    }
});

/*未结算*/
var NotSettle = React.createClass({
    orderClickHandler(e){
        e.stopPropagation();
        let server = H.server,
            Modal = H.Modal,
            _this = this;
        Modal({
            title: '其它补贴',
            content:'<div>' +
            '<h5>请认真填写正确的补贴金额</h5>' +
            '<input type="password" id="pass_input" style="margin: 10px;padding-left: 10px;" placeholder="请输入财务二级密码">' +
            '</div><div><input type="text" id="amount" style="margin: 10px;padding-left: 10px;" placeholder="请输入补贴金额"> 元</div>'+
            '<div class="error-mes"></div>',
            okText: '提交',
            okCallback(destroy,el){
                let pwd = $('#pass_input').val();
                if (!pwd) {
                    $('.error-mes').text('密码不能为空，请重新输入');
                    return;
                }
                let amount = $('#amount').val();
                _this.setState({
                    amount: amount
                });
                if(!amount && amount>=0){
                    amount = 0;
                }else {
                    amount = amount*100;
                }
                server.add_allowance({
                    id: _this.state.data.id,
                    amount: amount,
                    operation_password: pwd
                },(res)=>{
                    if (res.code == 0) {
                        el.html(res.message)
                            .siblings()
                            .children('#dialog-ok')
                            .hide();
                    }else{
                        $('.error-mes').text(res.message);
                    }
                });
            },
            closeBtn: true,
            closeCallback(destroy){
                destroy();
            }
        });
    },
    clearingClickHandler(e){
        e.stopPropagation();
        let server = H.server,
            Modal = H.Modal,
            _this = this;
        Modal({
            title: '结算扎账',
            content:'<div>' +
            '<h5>请确认是否需要现在结算扎账</h5>' +
            '</div>'+
            '<div class="error-mes"></div>',
            okText: '提交',
            okCallback(destroy,el){
                server.settle_accounts({
                    id: _this.state.data.id
                },(res)=>{
                    if (res.code == 0) {
                        el.html(res.message)
                            .siblings()
                            .children('#dialog-ok')
                            .hide();
                    }else{
                        $('.error-mes').text(res.message);
                    }
                });
            },
            closeBtn: true,
            closeCallback(destroy){
                destroy();
            }
        });
    },
    getInitialState(){
        return {
            data: {
                balance:0,last_balance:0,deposit_amount:0,withdraw_amount:0,refund_amount:0,deduct_amount:0,
                payment_fee:0,loss_remove:0
            },
            id: 0,
            amount: 0
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
        var amountXml = 0;
        if(this.state.amount == 0){
            amountXml = <a onClick={this.orderClickHandler}>填写</a> ;
        }else {
            amountXml = this.state.amount + "元"
        }
        var val = [
            H.priceSwitch(data.balance)+"元",
            H.priceSwitch(data.last_balance)+"元",
            H.priceSwitch(data.deposit_amount)+"元",
            H.priceSwitch(data.withdraw_amount)+"元",
            H.priceSwitch(data.refund_amount)+"元",
            H.priceSwitch(data.deduct_amount)+"元",
            H.priceSwitch(data.payment_fee)+"元",
            amountXml,
            H.priceSwitch(data.total_loss)+"元"
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
                <div><button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.clearingClickHandler}>结算扎账</button></div>
            </div>
        )
    }
});

//历史每一期数据列表;

var HistoryList = React.createClass({
    getInitialState(){
        return {
            optionArr: [],  //下拉选择里面的选项;
            history:[{
                balance:0,last_balance:0,deposit_amount:0,withdraw_amount:0,refund_amount:0,deduct_amount:0,
                payment_fee:0,loss_remove:0,other_allowance:0
            }], //历史数据列表;
            index: 0 //当前显示的某一期数据的ID;
        }
    },
    componentDidMount(){
        let server = H.server;
        let optionArr = [];
        let id = 0;
        server.history_data({size: 50},(res)=>{
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
            } else {
                H.Modal(res.message);
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
        var xml = "";
        if(this.state.optionArr.length > 0){
            xml = <DropDown changeEv={this.setData} dropdownData={this.state.optionArr} selectVal={this.state.index} />;
        }
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
                    {xml}
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
            data:[]
        }
    },
    componentWillMount(){
        let server = H.server;
        var d=new Date();
        d.getDate();
        var m=d.getMonth()+1;
        m = m>10?m:("0"+m);
        var time = d.getFullYear()+'-'+m+'-'+d.getDate();
        server.history_count({date_begin: '2016-01-01',date_end: time},(res)=>{
            if(res.code == 0){
                this.setState({
                    data: res.data
                })
            } else {
                H.Modal(res.message);
            }
        })
    },
    setData(index){

    },
    render(){
        var optionArr = ["全部"];
        var data = this.state.data;
        var val = [
            H.priceSwitch(data.deposit_amount || 0)+"元",
            H.priceSwitch(data.withdraw_amount || 0)+"元",
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