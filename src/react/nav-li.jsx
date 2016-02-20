/**
 * Created by john on 2016/1/27.
 */
/**
 *  this.props.data=>{
 *      id:xxx,
 *      name:xxx,
  *      sub_menu:xxx,
  *      url:xxx
 *  }
 * */
import React from "react";
import Link from "./link.jsx";

let NavLi = React.createClass({
    contextTypes: {
        tabs: React.PropTypes.array,
        changes: React.PropTypes.func
    },
    clickToCreateTab(elData){
        let menuData = (elData.id && elData.name) ? elData : this.props.data ,
            hasRendered = false;

        this.context.tabs.map((el,index)=>{
            if ( el.id != menuData.id ) {
                el.selected = false;
            }else if ( el.id == menuData.id ){
                el.selected = true;
                hasRendered = true;
            }
        });

        if (hasRendered) {
            this.context.changes(this.context.tabs);
            return;
        }
        this.context.tabs.push({
            id: menuData.id,
            name: menuData.name,
            url: menuData.url,
            selected: true
        });

        this.context.changes(this.context.tabs);
    },
    judgeSub(){
        return this.props.data.sub_menu.length ? this.hasSub() : this.hasNoSub();
    },
    hasSub(){
        return (
            <li className="submenu">
                <Link url={this.props.data.url} name={this.props.data.name}>
                    <i className="glyphicon glyphicon-fire"></i>
                    <span>{this.props.data.name}</span>
                    <i className="glyphicon glyphicon-menu-right arrow-right"></i>
                </Link>
                <ul className="animated fadeInDown">
                    {this.props.data.sub_menu.map(function(el,index){
                        return (
                            <li key={index}>
                                <Link id={"nid_" + el.id} name={el.name} clickEvent={this.clickToCreateTab.bind(this,el)}>
                                    <i className="glyphicon glyphicon-leaf"></i>
                                    <span>{el.name}</span>
                                </Link>
                            </li>
                        );
                    }.bind(this))}
                </ul>
            </li>
        );
    },
    hasNoSub(){
        return(
            <li>
                <Link id={"nid_" + this.props.data.id} name={this.props.data.name} clickEvent={this.clickToCreateTab}>
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