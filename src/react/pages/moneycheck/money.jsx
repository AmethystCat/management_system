import React from "react";
import MoneyCheckControl from "./money-controller.jsx";

var MoneyCheck = React.createClass({
    getInitialState(){
        return {
            waitData: {}, //未结算的数据;
            optionArr: [], //历史期数下拉的option数组;
            history: [] //历史每一期的数据数组;
        }
    },
    componentWillMount(){

    },
    render(){
        return (
            <MoneyCheckControl data={this.state.waitData} />
        );
    }
});

module.exports = MoneyCheck;