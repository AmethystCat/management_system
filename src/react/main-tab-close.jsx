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
    clickToCloseTab(e){
        e.stopPropagation();
        let flag = null;
        this.context.tabs.map((el,index)=>{
            if (el.id == this.props.data.id && !el.selected ) {
                flag = index;
            } else if (el.id == this.props.data.id && el.selected) {
                flag = index;
                el.selected = false;
                this.context.tabs[index-1].selected = true;
            }
        },this);
        this.context.tabs.splice(flag,1);
        this.context.changes(this.context.tabs);
    },
    render(){
        return (
            <i className="glyphicon glyphicon-remove tab-del-btn" onClick={this.clickToCloseTab}></i>
        );
    }
});

module.exports = TabClose;