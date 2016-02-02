/**
 * Created by Administrator on 2016/2/1.
 * 选择时间
 */
var React = require('react');
var DropDown = require('../drop_down/drop-down.js');
var Btn = require('../btn/btn.js');


/*关键字搜索栏*/
var KeySearch = React.createClass({
    getInitialState: function () {
        return {
            selVal:null
        }
    },
    searchKey: function () {
        var keyVal = this.refs.key.value;
        var selVal = this.state.selVal;
        alert(keyVal);
        alert(selVal);
    },
    backSelVal: function (val) {
        this.setState({selVal:val},function () {
            alert(val);
        });
    },
    render: function (){
        return (
            <div className="search-w">
                <DropDown changeEv={this.backSelVal} />
                <input className="form-control" type="text" ref="key" />
                <Btn name="搜 索" btnEvent={this.searchKey} />
            </div>
        )
    }
});

module.exports = KeySearch;