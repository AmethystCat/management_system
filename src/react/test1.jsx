/**
 * Created by john on 2016/1/26.
 */

import React from "react";

let Hello1 = React.createClass({

    render(){
        return (
            <div>
                <h1>Hello test1</h1>
                <input type="text" placeholder="我是test1"/>
            </div>
        );
    }
});

module.exports = Hello1;