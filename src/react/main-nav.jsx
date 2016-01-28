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
                    selected : true
                }
            ]
        }
    },
    stateChanged(state){
        this.setState(state);
    },
    getChildContext: function() {
        return {
            tabs: this.state.tab,
            changes:this.stateChanged
        };
    },
    childContextTypes: {
        tabs: React.PropTypes.array,
        changes: React.PropTypes.func
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
                    <ul className="nav nav-list">
                        {NavLis}
                    </ul>
                </div>
                <TabController tabs={this.state.tab}/>
            </div>
        )
    }
});

module.exports = NavController;