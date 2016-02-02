import React from "react";
import Deposit from "./deposit.jsx";

var Main = React.createClass({
    render(){
        return (
            <div className="section-deposit">
                <Deposit/>
            </div>
        )
    }
});

module.exports = Main;