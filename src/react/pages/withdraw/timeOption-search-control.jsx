import React from "react";
import TimeSearch from "../../components/time_search/time-search-option.js";

let TimeOptionSearchControl = React.createClass({
    timeSearchHandle(key){
        let params = {},
            arr = [1,2];
        params.page = 1;
        params.dataType = arr[key];
        this.props.timeSearchHandler(params);
    },
    render(){
        return <TimeSearch prefix="withdraw_" emit={this.timeSearchHandle} dropdownMenus={this.props.dropdownMenus}/>;
    }
});

export default TimeOptionSearchControl;