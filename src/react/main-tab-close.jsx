/**
 * this.props.data => {
 *      id : 0,
        name : "home",
        selected : true
 * }
 * */
import React from 'react';

let TabClose = React.createClass({
    contextTypes: {
        tabs: React.PropTypes.array,
        changes: React.PropTypes.func
    },
    clickToCloseTab(closeId){
        this.context.tabs.map((el,index)=>{
            if (el.id == closeId) {
                this.context.tabs.splice(index,1);
            }
        },this);
        this.context.changes(this.context.tabs);
    },
    render(){
        var closeId = this.props.data.id;
        return (
            <i className="glyphicon glyphicon-remove tab-del-btn" onClick={this.clickToCloseTab.bind(this,closeId)}></i>
        );
    }
});

module.exports = TabClose;