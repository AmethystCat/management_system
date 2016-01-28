import React from  "react";
import Hello from  "./test.jsx";

let MainTabContent = React.createClass({
    render(){
        return (
            <div>
                {this.props.name}
                <Hello/>
            </div>
        );
    }
});

module.exports = MainTabContent;