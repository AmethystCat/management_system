import React from  "react";
import Hello from  "./test.jsx";
import Hello1 from  "./test1.jsx";

let TabContentControl = React.createClass({
    render(){
        return (
            <div>
                {this.props.name}
                <Hello/>
            </div>
        );
    }
});

module.exports = TabContentControl;