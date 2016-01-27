import React from "react";

let Link = React.createClass({
    render(){
        return (
            <a href={this.props.url} title={this.props.name}>
                {this.props.children}
            </a>
        );
    }
});

module.exports = Link;