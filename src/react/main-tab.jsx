/**
 *this.props.tabs => {
    id : 0,
    name : "home",
    selected : true
 * }
 * */
import React from "react";
import TabClose from "./main-tab-close.jsx";
import TabContentControl from "./main-tab-content.jsx";

let TabController = React.createClass({
    navClick(id){
        //console.log('a clicked');
        if (id == 0) {
            this.props.homeClickEvent();
            return false;
        }
        $('#nid_' + id)[0].click();
        return false;
    },
    render(){
        return(
            <div className="section-main-panel" id="section-main">
                <div className="section-main-w">
                    <div className="tabs-w">
                        <ul className="nav nav-tabs" role="tablist" id="tab-list">
                            {
                                this.props.tabs.map(function(el,index){
                                    var aria = "tid_" + el.id,
                                        closeBtn = (el.id == 0) ? "" : <TabClose data={el}/>,
                                        isSelected = el.selected ? "active" : "";
                                    return (
                                      <li role="presentation" key={index} className={isSelected}>
                                          <a href="#" aria-controls={aria} onClick={this.navClick.bind(this,el.id)}>
                                              {el.name}
                                              <span>&nbsp;</span>
                                              {closeBtn}
                                          </a>
                                      </li>
                                    );
                                }.bind(this))
                            }
                        </ul>
                        <div className="tab-content" id="tab-content">
                            {
                                this.props.tabs.map(function(el,index){
                                    var tid = "tid_" + el.id,
                                        isActive = el.selected ? "tab-pane active" : "tab-pane";
                                    return (
                                        <div key={index} className={isActive} id={tid}>
                                            <TabContentControl contentId={el.id} name={el.name}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TabController;