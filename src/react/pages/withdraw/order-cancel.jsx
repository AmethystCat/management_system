/**
 * 撤回提现
 *
 * */

import React from "react";
import Btn from "../../components/btn/btn.js";

let OrderCancel = React.createClass({
    orderClickHandler(e){
        e.stopPropagation();
        let _this = this;
        H.Modal({
            title:"请确认是否撤回提现",
            width: 420,
            height: 290,
            autoClose: false,
            content:'<div class="cancel-info">' +
                        '<p>* 当提现信息有问题时，请通过订单系统修改相应的订单状态后，再让商家申请提现</p>' +
                        '<ul>' +
                            '<li><span>撤回理由:</span><input id="cancel_reason" class="cancel-reason-input" type="text"></li>' +
                            '<li>' +
                                '<span>通知运营:</span>' +
                                '<div class="form-input-w">' +
                                    '<label for="os_yes">是<input type="radio" checked name="toOperationalStaff" id="os_yes"></label>' +
                                    '<label for="os_no">否<input type="radio" name="toOperationalStaff" id="os_no"></label>' +
                                '</div>' +
                            '</li>' +
                            '<li>' +
                                '<span>通知用户:</span>' +
                                    '<div class="form-input-w">' +
                                        '<label for="to_yes">是<input type="radio" checked name="toUser" id="to_yes"></label>' +
                                        '<label for="to_no">否<input type="radio" name="toUser" id="to_no"></label>' +
                                    '</div>' +
                            '</li>' +
                        '</ul>' +
                        '<div class="error-mes"></div>' +
                    '</div>',
            okText: '提交',
            okCallback(destroy,el){
                let reason = $('#cancel_reason'),
                    errorMess = $('.error-mes');
                if (!reason.val()) {
                    reason.focus();
                    errorMess.text('请填写撤回理由。');
                    setTimeout(()=>{
                        errorMess.text('');
                    },2000);
                    return false;
                }
                let server = H.server,
                    params = {
                        id : _this.props.orderData.id,
                        reason : reason.val(),
                        notice_operator : $('#os_yes').prop('checked') ? 1 : 0,
                        notice_seller : $('#to_yes').prop('checked') ? 1 : 0
                    };
                server.withdraw_order_cancel(params,(res)=>{
                    if (res.code == 0) {
                        el.html(res.message)
                            .siblings()
                            .children('#dialog-ok')
                            .hide();
                        _this.props.currentPageDataFresh({page: _this.props.pagination});
                    } else {
                        errorMess.text(res.message);
                    }
                });
            },
            cancel: true,
            cancelCallback(destroy){
                destroy();
            }
        });
    },
    render(){
        return (
            <Btn otherClass="btn-xs" name="撤回提现" btnEvent={this.orderClickHandler}/>
        )
    }
});

export default OrderCancel;