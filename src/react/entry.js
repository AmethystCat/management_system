/**
 * Created by john on 2016/1/26.
 */

import React from "react";
import ReactDOM from "react-dom";
import component from "../less/all-style.less";

import Main from "./main.jsx";

ReactDOM.render(<Main/>,document.getElementById('main-holder'));
//var RootComponent = ReactDOM.render(<Main/>,document.getElementById('main-holder'));

//if (module.hot) {
//    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
//        getRootInstances: function () {
//            // help react hot loader figure out the root component instances on the page
//            return [RootComponent ];
//        }
//    });
//}
