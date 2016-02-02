import React from "react";

var WithDraw = React.createClass({
    getInitialState(){
        return {
            data:null
        };
    },
    componentWillMount(){
        let server = H.server;
        //server.withdraw_order_list({},function(res){
        //    console.log(res);
        //    if (res.code == 0) {
        //        this.setState({data:res.data}, function () {
        //            console.log(this.state.data);
        //        });
        //    } else {
        //        H.Modal(res.message);
        //    }
        //}.bind(this));
    },
    render(){
        return (
            <div>WithDraw panel</div>
        );
    }
});

module.exports = WithDraw;