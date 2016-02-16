/**
 * 重新补款
 *
 * */

import React from "react";
import Btn from "../../components/btn/btn.js";

let OrderReapply = React.createClass({
    orderClickHandler(e){
        e.stopPropagation();
        let server = H.server,
            Modal = H.Modal,
            _this = this;
        Modal({
            title: '请确认是否重新补款',
            autoClose: false,
            content:'<div>' +
                        '<h5>请认真确认，避免重新打款</h5>' +
                        '<input type="password" id="pass_input" placeholder="请输入财务二级密码">' +
                    '</div>'+
                    '<div class="error-mes"></div>',
            okText: '提交',
            okCallback(destroy,el){
                let pwd = $('#pass_input').val();
                if (!pwd) {
                    $('.error-mes').text('密码不能为空，请重新输入');
                    return;
                }
                server.withdraw_order_reapply({
                        id: _this.props.orderData.id,
                        financial_operate_pwd: pwd
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
            cancel: true,
            cancelCallback(destroy){
                _this.props.currentPageDataFresh(_this.props.pagination);
                destroy();
            }
        });
    },
    render(){
        return (
                <Btn otherClass="btn-xs" name="重新补款" btnEvent={this.orderClickHandler}/>
        )
    }
});

export default OrderReapply;