import React from "react";

let Deposit = React.createClass({
    getInitialState(){
        return {
            data:null
        };
    },
    componentWillMount(){
        let server = H.server;
        server.deposit_order_list({},function(res){
            console.log(res);
            if (res.code == 0) {
                this.setState({data:res.data}, function () {
                    console.log(this.state.data);
                });
            } else {
                H.Modal(res.message);
            }
        }.bind(this));
    },
    render(){
        return (
            <div>Deposit panel</div>
        )
    }
});

module.exports = Deposit;