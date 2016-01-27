/**
 * Created by john on 2016/1/27.
 */
import React from 'react';
import NavLi from './nav-li.jsx';
import TabController from './main-tab.jsx';

let NavController = React.createClass({
    getInitialState(){
        return {
            tab:[
                {
                    id : 1,
                    name : "home",
                    selected : true
                },
                {
                    id : 2,
                    name : ""
                }
            ]
        }
    },
    componentWillMount(){
        console.log(this.props);
    },
    render(){
        var NavLis = this.props.menu.data.menu.map(function (el, index) {
            return <NavLi key={index} data={el}/>;
        });
        return (
            <div>
                <div className="section-left-nav left-sidebar">
                    <div className="user-menu">
                        <img src="/src/img/avatar.png" alt=""/>
                        <div className="user-info">
                            <div className="welcome">welcome</div>
                            <div className="username">{this.props.menu.data.user.name}</div>
                        </div>
                        <div className="user-status">
                            <i className="glyphicon glyphicon-heart" aria-hidden="true"></i>
                        </div>
                    </div>
                    <ul className="nav nav-list">
                        {/*<li className="active">
                            <a href="#unaudited" title="未审核商品">
                                <i className="glyphicon glyphicon-home"></i>
                                <span>未审核商品</span>
                            </a>
                        </li>
                        <li className="submenu">
                            <a href="#all" className="dropdown" title="全部商品">
                                <i className="glyphicon glyphicon-fire"></i>
                            <span>
                                全部商品
                                <i className="glyphicon glyphicon-menu-right arrow-right"></i>
                            </span>
                            </a>
                            <ul className="animated fadeInDown">
                                <li>
                                    <a href="#all-category1" title="一类商品">
                                        <i className="glyphicon glyphicon-leaf"></i>
                                        <span>一类商品</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#all-category2" title="二类商品">
                                        <i className="glyphicon glyphicon-leaf"></i>
                                        <span>二类商品</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#all-category3" title="三类商品">
                                        <i className="glyphicon glyphicon-leaf"></i>
                                        <span>三类商品</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#recommend" title="推荐商品">
                                <i className="glyphicon glyphicon-gift"></i>
                                <span>推荐商品</span>
                            </a>
                        </li>
                        <li>
                            <a href="#history" title="求购记录">
                                <i className="glyphicon glyphicon-star"></i>
                                <span>求购记录</span>
                            </a>
                        </li>
                        <li>
                            <a href="#shoppinglist" title="常购列表">
                                <i className="glyphicon glyphicon-pushpin"></i>
                                <span>常购列表</span>
                            </a>
                        </li>*/}
                        {NavLis}
                    </ul>
                </div>
                <TabController/>
            </div>
        )
    }
});

module.exports = NavController;