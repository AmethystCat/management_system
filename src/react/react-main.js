/**
 * Created by john on 2016/1/26.
 */

import React from "react";
import ReactDOM from "react-dom";
import component from "../less/components.less";
import variable from "../less/variable.less";
import index from "../less/index.less";
import table from "../less/table.less";


import Hello from "./test.jsx";

var RootComponent = ReactDOM.render(<Hello/>,document.getElementById('section-main'));

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            // help react hot loader figure out the root component instances on the page
            return [RootComponent];
        }
    });
}
