import React from "react";

let TabController = React.createClass({
    render(){
        return(
            <div className="section-main-panel" id="section-main">
                <div className="section-main-w">
                    <div className="tabs-w">
                        <ul className="nav nav-tabs" role="tablist" id="tab-list">
                            <li role="presentation" className="active">
                                <a href="#home" aria-controls="home" role="tab" data-toggle="tab">
                                    Home
                                </a>
                            </li>
                            <li role="presentation">
                                <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">
                                    Profile
                                    <i className="glyphicon glyphicon-remove tab-del-btn"></i>
                                </a>
                            </li>
                            <li role="presentation">
                                <a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">
                                    Messages
                                    <i className="glyphicon glyphicon-remove tab-del-btn"></i>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="home">home</div>
                            <div role="tabpanel" className="tab-pane" id="profile">已收款</div>
                            <div role="tabpanel" className="tab-pane" id="messages">商家体现</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TabController;