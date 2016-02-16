/**
 * 系统代付
 *
 * */

import React from "react";
import Btn from "../../components/btn/btn.js";

let OrderPayAuto = React.createClass({
    orderClickHandler(e){
        e.stopPropagation();
        let server = H.server,
            Modal = H.Modal,
            _this = this;
        Modal({
            title: '请确认系统自动代付金额',
            autoClose: false,
            content: '<div>' +
                    '<ul>' +
                    '<li><span>商家信息: </span></li>' +
                    '<li><span>应付金额: </span></li>' +
                    '<li><span>收款帐号: </span></li>' +
                    '<li><span>通知用户: </span></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="error-mes"></div>',
            okText: '提交',
            okCallback(destroy,el){
                let params = {
                    id : _this.props.id
                };
                server.withdraw_order_pay_auto_do(params,(res)=>{
                    if (res.code == 0) {
                        // 刷新当前页的数据
                        _this.props.currentPageDataFresh(_this.props.pagination);
                    }else{
                        $('.error-mes').text(res.message);
                    }
                });
            }
        });
    },
    render(){
        return (
                <Btn otherClass="btn-xs" name="系统代付" btnEvent={this.orderClickHandler}/>
        )
    }
});

export default OrderPayAuto;