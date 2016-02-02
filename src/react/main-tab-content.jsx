import React from  "react";
import Home from  "./pages/home/main.jsx";
import Deposit from  "./pages/deposit/main.jsx";
import WithDraw from  "./pages/withdraw/main.jsx";

let TabContentControl = React.createClass({
    render(){
        let url = this.props.url,
            panelContent = null;
        if (url.indexOf('home') != -1) {
            panelContent = <Home/>;
        } else if (url.indexOf('deposit') != -1) {
            panelContent = <Deposit/>
        } else if (url.indexOf('withdraw') != -1 ) {
            panelContent = <WithDraw/>;
        }
        return (
            <div>
                {panelContent}
            </div>
        );
    }
});

module.exports = TabContentControl;