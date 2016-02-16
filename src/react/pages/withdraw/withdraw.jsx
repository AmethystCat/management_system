import React from "react";
import WithDrawControl from "./table-control.jsx";

var WithDraw = React.createClass({
    getInitialState(){
        return {
            data: [],
            pageNum: 1
        };
    },
    getChildContext: function() {
        return {
            withDrawData: this.state.data,
            currFresh: this.getWithDrawData
        };
    },
    childContextTypes: {
        withDrawData: React.PropTypes.array,
        currFresh: React.PropTypes.func
    },
    componentDidMount(){
        this.getWithDrawData(1);
    },
    getWithDrawData(pagination){
        let server = H.server;
        server.withdraw_order_list({
            page: pagination|| 1
        },(res)=>{
            console.log(res);
            if (res.code == 0) {
                this.setState({
                    data: res.data,
                    pageNum: Math.ceil(res.total_count/40)
                });
            } else {
                H.Modal(res.message);
            }
        });
    },
    render(){
        console.log(this.state);
        return (
            <WithDrawControl pageNum={this.state.pageNum} data={this.state.data}/>
        );
    }
});

module.exports = WithDraw;