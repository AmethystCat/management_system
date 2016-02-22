import React from "react";
import WithDrawControl from "./table-control.jsx";

var WithDraw = React.createClass({
    getInitialState(){
        return {
            data: [],
            pageNum: 1,
            currentPage: 1
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
        this.getWithDrawData({page: 1});
    },
    getWithDrawData(param){
        let server = H.server,
            obj = param || {},
            defaultParam = {
                date_type : 1,
                date_begin : $('#withdraw_startTime').val(),
                date_end : $('#withdraw_endTime').val()
            },
            params = Object.assign(defaultParam,obj);

        this.setState({
            currentPage: param.page
        },()=>{
            server.withdraw_order_list(params,(res)=>{
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
        });
    },
    render(){
        return (
            <WithDrawControl currentPage={this.state.currentPage} pageNum={this.state.pageNum} data={this.state.data}/>
        );
    }
});

export default WithDraw;