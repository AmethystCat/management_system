import React from "react";
import TimeSearch from "../../components/time_search/time-search.js";

let TimeSearchControl = React.createClass({
    timeSearchHandle(key){
        let params = {},
            arr = [1,2];
        params.page = 1;
        params.dataType = arr[key];
        this.props.searchHandler(params);
    },
    render(){
        return <TimeSearch prefix="deposit_" emit={this.timeSearchHandle} dropdownMenus={this.props.dropdownMenus}/>;
    }
});

export default TimeSearchControl;