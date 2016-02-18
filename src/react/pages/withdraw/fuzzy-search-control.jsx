import React from "react";
import Search from "../../components/search/search.js";

var FuzzySearchControl = React.createClass({
    fuzzySearchHandler(keyFlag,keyword){
        let params = {},
            arr = [{key:'username',value:''},{key:'shop_name',value:''},{key:'bank_account_name',value:''},{key:'bank_account_no',value:''}];
        arr.map((el,index)=>{
            if (index == keyFlag) {
                params[el["key"]] = keyword;
            } else {
                params[el["key"]] = "";
            }
        });
        params.page = 1;
        this.props.searchHandler(params);
    },
    render(){
        return <Search emit={this.fuzzySearchHandler} dropdownMenus={this.props.dropdownMenus}/>;

    }
});

export default FuzzySearchControl;