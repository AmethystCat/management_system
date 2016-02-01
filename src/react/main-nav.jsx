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
    stateUpdated(state){
        this.setState(state);
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
    homeClickHandler(){
        console.log(123);
        this.state.tab.map((el,index)=>{
            el.selected = (el.id == 0) ? true : false;
        });
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
                        <div className="user-status">
                            <i className="glyphicon glyphicon-heart" aria-hidden="true"></i>
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