/**
 * 撤回提现
 *
 * */

import React from "react";
import Btn from "../../components/btn/btn.js";

let OrderCancel = React.createClass({
    orderClickHandler(e){
        e.stopPropagation();
        H.Modal({
            title:"请确认是否撤回提现",
        });
    },
    render(){
        return (
            <Btn otherClass="btn-xs" name="撤回提现" btnEvent={this.orderClickHandler}/>
        )
    }
});

export default OrderCancel;