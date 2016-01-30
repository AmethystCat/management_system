/**
 * Created by john on 2016/1/26.
 */

import React from "react";

let Hello = React.createClass({
    componentDidMount(){
        var server = H.server;
        server.home_data({},function(res){
            console.log(res);
        })
    },
    render(){
        return (
            <div>
                <h1>Hello react,coasdasdsme on</h1>
                <input type="text" placeholder="我是test"/>
            </div>
        );
    }
});

module.exports = Hello;