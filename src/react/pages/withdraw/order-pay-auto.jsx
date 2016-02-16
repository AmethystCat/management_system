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
            closeBtn: true,
            content: '<div class="auto-info">' +
                    '<ul>' +
                    '<li><span>商家信息: </span>'+ _this.props.orderData.user_name + '('+ _this.props.orderData.shop_name +')</li>' +
                    '<li><span>应付金额: </span>'+ H.priceSwitch(_this.props.orderData.amount) + '元</li>' +
                    '<li><span>收款帐号: </span>'+ _this.props.orderData.bank_account_no +'</li>' +
                    '<li>' +
                        '<span>通知用户: </span>' +
                        '<div>' +
                            '<label for="yes">是<input type="radio" checked name="telluser" id="yes"></label>' +
                            '<label for="no">否<input type="radio" name="telluser" id="no"></label>' +
                        '</div>' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="error-mes"></div>',
            okText: '提交',
            okCallback(destroy,el){
                let params = {
                    id : _this.props.id ,
                    notice : $('#yes').prop('checked') ? 1 : 0
                };
                server.withdraw_order_pay_auto_do(params,(res)=>{
                    if (res.code == 0) {
                        el.html(res.message)
                            .siblings()
                            .children('#dialog-ok')
                            .attr("disabled",true);
                        // 刷新当前页的数据
                        _this.props.currentPageDataFresh(_this.props.pagination);
                        setTimeout(()=>{
                            destroy();
                        },2000);
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