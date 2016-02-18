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
import Btn from "../../components/btn/btn.js";
import PageCtrlBar from "../../components/page/paging";
import FuzzySearchControl from "./fuzzy-search-control.jsx";
import TimeSearchControl from "./time-search-control.jsx";

let DepositTableControl = React.createClass({
    getInitialState(){
        return {
            filterCondition:{},
            btnGroupFilter: [
                {
                    name:"全部",
                    selected:true,
                    money_place: 0
                },
                {
                    name:"支付宝",
                    selected:false,
                    money_place: 1
                },
                {
                    name:"农行卡",
                    selected:false,
                    money_place: 2
                },
                {
                    name:"微信账户",
                    selected:false,
                    money_place: 3
                }
            ]
        }
    },
    getBack(value){
        let _this = this;
        H.Modal({
            content:"确认撤回该次收款？",
            autoClose: false,
            closeBtn: true,
            okCallback: function (destroy,el) {
                let server = H.server;
                function close(message){
                    el.text(message)
                        .siblings()
                        .children('#dialog-ok')
                        .attr('disabled','true');
                    setTimeout(()=>{
                        destroy();
                    },2000);
                }
                server.deposit_order_cancel({id: value.id},(res)=>{
                    if (res.code == 0) {
                        close(res.message);
                        _this.getPageData();
                    } else {
                        close(res.message);
                    }
                });
            }
        });
    },
    showBtnGroupFilterResult(money_place,e){
        e.preventDefault();
        // 与当前已有的条件进行合并
        let newCondition = Object.assign(this.state.filterCondition,{money_place: money_place,page: 1,status: 2}),
            newBtnGroupFilter = this.state.btnGroupFilter.map((value,index)=>{
                value.selected = (value.money_place === money_place);
                return value;
            });

        this.setState({
            filterCondition: newCondition,
            btnGroupFilter: newBtnGroupFilter
        },()=>{
            let params = this.state.filterCondition;
            if (!this.state.filterCondition.money_place) {
                params.money_place = "";
            }
            this.props.getData(params);
        });
    },
    getPageData(params){
        let mergeParams = Object.assign(this.state.filterCondition,params||{},{status: 2});
        console.log(this.state.filterCondition.page);
        this.props.getData(mergeParams);
    },
    render(){
        var headArr = ['收款ID','订单ID','付款人','实收金额(元)','订单金额(元)','优惠减免(元)','付款方式','确认人','资金位置','付款确认时间','操作'],
            pay_channel = ['打款','微信支付','支付宝'],
            money_place = ['支付宝','农行','微信'];
        return (
            <div className="section-deposit">
                <div className="section-filter">
                    <form action="" className="form-inline">
                        <FuzzySearchControl searchHandler={this.getPageData} dropdownMenus={['付款人','确认人','店铺名']}/>
                        <TimeSearchControl searchHandler={this.getPageData}/>
                        <div className="btn-group btn-w">
                            {this.state.btnGroupFilter.map((value,index)=>{
                                return <Btn
                                    key={"btnFilter_" + index}
                                    name={value.name}
                                    otherClass={value.selected ? "btn-primary" : ""}
                                    btnEvent={this.showBtnGroupFilterResult.bind(this,value.money_place)}
                                />
                            })}
                        </div>
                    </form>
                </div>
                <div className="section-table">
                    <Table res={this.props.data} titles={headArr} types="1">
                        <tbody>
                            {this.props.data.map((value,index)=>{
                                return (
                                    <tr key={'deposit_tr_'+index}>
                                        <td>{value.id}</td>
                                        <td>{value.main_order_no}</td>
                                        <td>{value.buyer_name + "(" + value.shop_name + ")"}</td>
                                        <td>{H.priceSwitch(value.pay_amount)}</td>
                                        <td>{H.priceSwitch(value.order_amount)}</td>
                                        <td>{H.priceSwitch(value.deduct_amount)}</td>
                                        <td>{pay_channel[ value.pay_channel - 1 ]}</td>
                                        <td>{value.order_operator_name}</td>
                                        <td>{money_place[ value.money_place - 1 ]}</td>
                                        <td>{value.updated_at}</td>
                                        <td><Btn otherClass="btn-xs" btnEvent={this.getBack.bind(this,value)} name="撤回"/></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <PageCtrlBar pageNum={this.props.currentPage}  maxPage={this.props.pageNum} clickCallback={this.getPageData}/>
                </div>
            </div>
        );
    }
});

module.exports = DepositTableControl;