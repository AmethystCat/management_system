/**
 * 人工打款
 *
 * */

import React from "react";
import Btn from "../../components/btn/btn.js";

let OrderPayManual = React.createClass({
    orderClickHandler(e){
        e.stopPropagation();
        let _this = this,
            server = H.server;
        server.pay_bank_account({},(res)=>{
            if (res.code == 0) {
                H.Modal({
                    title:"请确认是否撤回提现",
                    width: 420,
                    height: 280,
                    autoClose: false,
                    content: '<div class="pay-manual-info">' +
                    '<p>*请在人工打款完成后，点击此处确认。</p>' +
                        '<ul>' +
                            '<li><span>商家信息:</span>'+ _this.props.orderData.user_name + '(' + _this.props.orderData.shop_name +')</li>' +
                            '<li><span>应付金额:</span>'+ H.priceSwitch(_this.props.orderData.amount) +'元</li>' +
                            '<li>' +
                                '<span>收款账号:</span>' +
                                '<div class="payee-info">' +
                                    '<div>' + _this.props.orderData.bank_name + '<span>&nbsp;</span>' +_this.props.orderData.bank_address + '</div>' +
                                    '<div>' + _this.props.orderData.bank_account_name + '<span>&nbsp;</span>' + _this.props.orderData.bank_account_no + '</div>' +
                                '</div>' +
                            '</li>' +
                            '<li>' +
                                '<span>支出帐号:</span>' +
                                '<div class="select-bank">' +
                                    '<select name="banks" id="bank_selected">' +
                                        res.data.map((value,index)=>{
                                            return "<option value=" + value.bankAccountNo + ">" +value.bankName +"(尾号"+ value.bankAccountNo.substr(-4) +")"+"</option>";
                                        }) +
                                    '</select>' +
                                '</div>' +
                            '</li>' +
                            '<li>' +
                                '<span>短信通知:</span>' +
                                '<div class="form-input-w">' +
                                    '<label for="messNotice_yes">是<input checked type="radio" name="messNotice" id="messNotice_yes"></label>' +
                                    '<label for="messNotice_no">否<input type="radio" name="messNotice" id="messNotice_no"></label>' +
                                '</div>' +
                            '</li>' +
                        '</ul>' +
                    '</div>',
                    closeBtn: true,
                    okText: '确认',
                    okCallback(destroy,el){
                        let params = {
                            id : _this.props.orderData.id,
                            pay_bank_no : $('#bank_selected').val(),
                            notice : $('#messNotice_yes').prop('checked') ? 1 : 0
                        };
                        server.withdraw_order_pay_manual_confirm(params,(res)=>{
                            if (res.code == 0) {
                                _this.props.currentPageDataFresh({page: _this.props.pagination});
                                el.html(res.message)
                                    .siblings()
                                    .children('#dialog-ok')
                                    .attr("disabled",true);
                                setTimeout(()=>{
                                    destroy();
                                },2000);
                            } else {
                                $('.error-mes').text(res.message);
                            }
                        });

                    }
                });
            } else {
                H.Modal(res.message);
            }
        });

    },
    render(){
        return (
                <Btn otherClass="btn-xs" name="人工打款" btnEvent={this.orderClickHandler}/>
        )
    }
});

export default OrderPayManual;