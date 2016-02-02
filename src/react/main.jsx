import React from "react";
import NavController from "./main-nav.jsx"

let Main = React.createClass({
    getInitialState(){
        return {
            res:{
                data:{
                    user:{},
                    menu:[]
                }
            }
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
                        id:"1",
                        name: "已收款",
                        url: "/deposit/order/list.json",
                        sub_menu: []
                    },
                    {
                        id:"2",
                        name: "全部商品",
                        url: "#allproducts",
                        sub_menu: [
                            {
                                id:"2-1",
                                name: "A类商品",
                                url: "#productA",
                                sub_menu: []
                            },
                            {
                                id:"2-2",
                                name: "B类商品",
                                url: "#productB",
                                sub_menu: []
                            },
                            {
                                id:"2-3",
                                name: "C类商品",
                                url: "#productC",
                                sub_menu: []
                            }
                        ]
                    },
                    {
                        id:"3",
                        name: "买家退款",
                        url: "#refund",
                        sub_menu: []
                    },
                    {
                        id:"4",
                        name: "商家提现",
                        url: "/withdraw/seller/list.json",
                        sub_menu: []
                    },
                    {
                        id:"5",
                        name: "汇总对账",
                        url: "#huizongduizhang",
                        sub_menu: []
                    }
                ]
            },
            message:"success"
        };
        // let server = H.server;
        // server.nav({},function(res){
        //     console.log(res);
        //     this.setState({res:res});
        // }.bind(this));
        this.setState({res:res});
    },
    render(){
        return <NavController menu={this.state.res}/>;
    }
});

module.exports = Main;
