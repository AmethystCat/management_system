import React from "react";

var Home = React.createClass({
    getInitialState(){
        return {
            data:{
                data:null,
                name:null
            }
        };
    },
    componentWillMount(){
        let server = H.server;
        server.home_data({},function(res){
            console.log(res);
            if (res.code == 0) {
                this.setState({data:res.data});
            } else {
                H.Modal(res.message);
            }
        }.bind(this));
    },
    render(){
        return (
            <div>
                Home panel
                <div>{this.state.data.data}</div>
                <div>{this.state.data.name}</div>
            </div>
        );
    }
});

module.exports = Home;