import React from "react";
import NavController from "./main-nav.jsx"

let Main = React.createClass({
    getInitialState(){
        return {
            res:[]
        };
    },
    componentWillMount(){
        // 请求菜单数据
        let res = {
            code:0,
            data: {
                user: {
                    name : "hc",
                    role : "admin",
                    last_login_time:"2016-01-27 16:47"
                },
                menu:[
                    {
                        name: "已收款",
                        url: "#yishoukuan",
                        sub_menu: []
                    },
                    {
                        name: "全部商品",
                        url: "....#allproducts",
                        sub_menu: [
                            {
                                name: "A类商品",
                                url: "#productA",
                                sub_menu: []
                            },
                            {
                                name: "B类商品",
                                url: "#productB",
                                sub_menu: []
                            },
                            {
                                name: "c类商品",
                                url: "#productC",
                                sub_menu: []
                            }
                        ]
                    },
                    {
                        name: "买家退款",
                        url: "#refund",
                        sub_menu: []
                    },
                    {
                        name: "商家提现",
                        url: "#tixian",
                        sub_menu: []
                    },
                    {
                        name: "汇总对账",
                        url: "#huizongduizhang",
                        sub_menu: []
                    }
                ]
            },
            message:"success"
        };
        this.setState({res:res});
    },
    render(){
        return <NavController menu={this.state.res}/>;
    }
});

module.exports = Main;
