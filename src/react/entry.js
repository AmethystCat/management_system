/**
 * Created by john on 2016/1/26.
 */

import React from "react";
import ReactDOM from "react-dom";
import component from "../less/all-style.less";

import Hello from "./test.jsx";
import Main from "./main.jsx";

var RootComponent = ReactDOM.render(<Main/>,document.getElementById('main-holder'));
var RootComponent2 =  ReactDOM.render(<Hello/>,document.getElementById('section-main1'));

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            // help react hot loader figure out the root component instances on the page
            return [RootComponent,RootComponent2];
        }
    });
}
