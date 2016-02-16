/**
 * 人工打款
 *
 * */

import React from "react";
import Btn from "../../components/btn/btn.js";

let OrderPayManual = React.createClass({
    orderClickHandler(e){
        e.stopPropagation();
    },
    render(){
        return (
                <Btn otherClass="btn-xs" name="人工打款" btnEvent={this.orderClickHandler}/>
        )
    }
});

export default OrderPayManual;