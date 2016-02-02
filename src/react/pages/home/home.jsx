import React from "react";

var Home = React.createClass({
    getInitialState(){
        return {
            user:{
                name:null,
                role:null
            }
        };
    },
    componentWillMount(){
        let server = H.server;
        server.nav({},function(res){
            console.log(res);
            if (res.code == 0) {
                this.setState({user:res.data.user});
            } else {
                H.Modal(res.message);
            }
        }.bind(this));
    },
    render(){
        return (
            <div>
                欢迎
                <p>{this.state.user.name}（{this.state.user.role}）</p>
            </div>
        );
    }
});

module.exports = Home;