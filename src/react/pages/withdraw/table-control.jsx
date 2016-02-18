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
import PageCtrlBar from "../../components/page/paging";
import Btn from "../../components/btn/btn.js";
import FuzzySearchControl from "./fuzzy-search-control.jsx";
import TimeOptionSearchControl from "./timeOption-search-control.jsx";
import OrderCancel from "./order-cancel.jsx";
import OrderPayAuto from "./order-pay-auto.jsx";
import OrderPayManual from "./order-pay-manual.jsx";
import OrderReapply from "./order-reapply.jsx";
import TrInfo from "./tr-info.jsx";

let WithDrawControl = React.createClass({
    contextTypes: {
        withDrawData: React.PropTypes.array,
        currFresh: React.PropTypes.func
    },
    getInitialState(){
        return {
            infoPanelIsShow: false,
            infoPanelFlag: {},
            filterCondition: {},
            btnGroupFilter: [
                {
                    name:"全部",
                    selected:true,
                    status: 0
                },
                {
                    name:"待确认",
                    selected:false,
                    status: 1
                },
                {
                    name:"已确认",
                    selected:false,
                    status: 2
                },
                {
                    name:"处理中",
                    selected:false,
                    status: 3
                },
                {
                    name:"已成功",
                    selected:false,
                    status: 4
                },
                {
                    name:"处理失败",
                    selected:false,
                    status: 5
                },
                {
                    name:"已撤回",
                    selected:false,
                    status: 6
                }
            ]
        }
    },
    getAlternativeBtnGroups(value){
        // 根据状态返回不同的操作按钮给单元格
        let status = value.status;
        if (status == 2 || status == 5) {
            return <OrderReapply
                        pagination={this.props.currentPage}
                        currentPageDataFresh={this.getCurrentPageData}
                        orderData={value}
                    />;
        } else if (status == 1) {
            return (
                <div>
                    <OrderPayManual
                        pagination={this.props.currentPage}
                        currentPageDataFresh={this.getCurrentPageData}
                        orderData={value}
                    />&nbsp;
                    <OrderPayAuto
                        pagination={this.props.currentPage}
                        currentPageDataFresh={this.getCurrentPageData}
                        orderData={value}
                    />&nbsp;
                    <OrderCancel
                        pagination={this.props.currentPage}
                        currentPageDataFresh={this.getCurrentPageData}
                        orderData={value}
                    />
                </div>
            );
        } else {
            return (<div>无</div>)
        }
    },
    getCurrentPageData(condition){
        // 根据已有的状态跟新当前页的数据业务逻辑
            // 与当前已有的条件进行合并
        let newCondition = Object.assign(this.state.filterCondition,condition||{});
        this.setState({
            filterCondition: newCondition
        }, ()=>{
            this.context.currFresh(this.state.filterCondition);
        });
    },
    showBtnGroupFilterResult(status,e){
        e.preventDefault();
        // 与当前已有的条件进行合并
        let newCondition = Object.assign(this.state.filterCondition,{status: status,page: 1}),
            // 改变筛选按钮的选中状态
            newBtnGroupFilter = this.state.btnGroupFilter.map((value,index)=>{
                value.selected = (value.status === status);
                return value;
            });
        // 更新页面的筛选条件的状态
        this.setState({
            filterCondition: newCondition,
            btnGroupFilter: newBtnGroupFilter
        },()=>{
            let params = this.state.filterCondition;
            if (!this.state.filterCondition.status) {
                params.status = "";
            }
            this.context.currFresh(params);
        });
    },
    showInfoPanel(value){
        this.setState({
            infoPanelIsShow: true,
            infoPanelFlag: value
        });
    },
    hideInfoPanel(){
        this.setState({
            infoPanelIsShow: false
        })
    },
    render(){
        var headArr = ['ID','商家信息','提现金额(元)','订单详情','收款帐号','开户行','申请时间','打款时间','状态','操作'],
            status = ['待确认','已确认','处理中','已成功','处理失败','已撤回'];
        return (
            <div className="section-withdraw">
                <div className="section-filter">
                    <form action="" className="form-inline">

                        <FuzzySearchControl searchHandler={this.getCurrentPageData} dropdownMenus={['名字','店铺名','收款名','收款帐号']}/>

                        <div className="time-search-w">
                            <TimeOptionSearchControl timeSearchHandler={this.getCurrentPageData} dropdownMenus={['申请时间','打款时间']}/>
                        </div>

                        <div className="btn-group btn-w">
                            {this.state.btnGroupFilter.map((value,index)=>{
                                return <Btn
                                        key={"btnFilter_" + index}
                                        name={value.name}
                                        otherClass={value.selected ? "btn-primary" : ""}
                                        btnEvent={this.showBtnGroupFilterResult.bind(this,value.status)}
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
                                    <tr key={'deposit_tr_' + index} onClick={this.showInfoPanel.bind(this,value)}>
                                        <td>{value.id}</td>
                                        <td>{value.user_name + "(" + value.shop_name + ")"}</td>
                                        <td>{H.priceSwitch(value.amount)}</td>
                                        <td>{value.sub_order_count}</td>
                                        <td>{value.bank_account_no}</td>
                                        <td>{value.bank_name}</td>
                                        <td>{value.created_at}</td>
                                        <td>{value.updated_at}</td>
                                        <td>{status[ value.status - 1 ]}</td>
                                        <td>{this.getAlternativeBtnGroups(value)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <PageCtrlBar clickCallback={this.getCurrentPageData} pageNum={this.props.currentPage} maxPage={this.props.pageNum}/>

                </div>

                <div className={ this.state.infoPanelIsShow ? "section-tr-info show" : "section-tr-info" }>
                    <i className="info-close-btn" title="点击隐藏弹出层" onClick={this.hideInfoPanel}>close</i>
                    <TrInfo infoFlag={this.state.infoPanelFlag}/>
                </div>
            </div>
        );
    }
});

module.exports = WithDrawControl;