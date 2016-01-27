/**
 * Created by john on 2016/1/27.
 */
import React from "react";
import Link from "./link.jsx";

let NavLi = React.createClass({
    componentWillMount(){},
    judgeSub(){
        return this.props.data.sub_menu.length ? this.hasSub() : this.hasNoSub();
    },
    hasSub(){
        return (
            <li className="sub_menu">
                <Link url={this.props.data.url} name={this.props.data.name}>
                    <i className="glyphicon glyphicon-fire"></i>
                    <span>{this.props.data.name}</span>
                    <i className="glyphicon glyphicon-menu-right arrow-right"></i>
                </Link>
                <ul className="animated fadeInDown">
                    {this.props.data.sub_menu.map(function(el,index){
                        return (
                            <li key={index}>
                                <a href={el.url} title={el.name}>
                                    <i className="glyphicon glyphicon-leaf"></i>
                                    <span>{el.name}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </li>
        );
    },
    hasNoSub(){
        return(
            <li>
                <Link url={this.props.data.url} name={this.props.data.name}>
                    <i className="glyphicon glyphicon-fire"></i>
                    <span>{this.props.data.name}</span>
                </Link>
            </li>
        );
    },
    render(){
        return this.judgeSub();
    }
});

module.exports = NavLi;