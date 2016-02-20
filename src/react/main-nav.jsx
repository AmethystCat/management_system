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
                    id : 0,
                    name : "home",
                    url : "home",
                    selected : true
                }
            ]
        }
    },
    getChildContext: function() {
        return {
            tabs: this.state.tab,
            changes:this.stateUpdated
        };
    },
    childContextTypes: {
        tabs: React.PropTypes.array,
        changes: React.PropTypes.func
    },
    stateUpdated(state){
        this.setState(state);
    },
    homeClickHandler(){
        this.state.tab.map((el,index)=>{
            el.selected = (el.id == 0) ? true : false;
            return el;
        });
        this.stateUpdated(this.state.tab);
    },
    setIconClickHandler(id){
        let hasRendered = false;
        $('.nav.nav-list')
            .find('a')
            .parent()
            .removeClass('active');

        this.state.tab.map((el,index)=>{
            if (el.id === id) {
                el.selected = true;
                hasRendered = true;
            } else {
                el.selected = false;
            }
            return el;
        });
        
        if ( !hasRendered ) {
            this.state.tab.push({
                id : -1,
                name : "个人信息设置",
                url : "messageManagement",
                selected : true
            });
        }
        this.stateUpdated(this.state.tab);
    },
    render(){
        let NavLis = this.props.menu.data.menu.map(function (el, index) {
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
                        <div className="user-status" id="nid_-1" onClick={this.setIconClickHandler.bind(this,-1)}>
                            <i className="glyphicon glyphicon-cog" aria-hidden="true" title="设置个人信息"></i>
                        </div>
                    </div>
                    {/*nav left menu*/}
                    <ul className="nav nav-list">
                        {NavLis}
                    </ul>
                </div>
                {/*right tab menu*/}
                <TabController homeClickEvent={this.homeClickHandler} tabs={this.state.tab}/>
            </div>
        )
    }
});

module.exports = NavController;