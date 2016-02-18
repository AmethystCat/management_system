/**
 * Created by Administrator on 2016/2/1.
 * 时间搜索栏
 */
var React = require('react');
var DropDown = require('../drop_down/drop-down.js');
var ChooseTime = require('../choose_time/choose-time.js');
var Btn = require('../btn/btn.js');


/*时间搜索栏;*/
var TimeSearch = React.createClass({
    getInitialState: function () { /*初始state数据;*/
        return {
            selVal:0
        }
    },
    changeHandlerStart: function(time){  /*从子组件传过来的开始时间;*/
        //this.setState({startTime: time});
        var endTimeVal = $("#"+this.props.prefix+"startTime").val();
        if(time > endTimeVal){
            H.Modal("结束时间不能小于开始时间");
            return false;
        }
    },
    changeHandlerEnd: function(time){  /*从子组件传过来的结束时间;*/
        //this.setState({endTime: time});
        var startTimeVal = $("#"+this.props.prefix+"startTime").val();
        if(startTimeVal > time){
            H.Modal("结束时间不能小于开始时间");
            return false;
        }
    },
    backSelVal: function (val) {
        this.setState({selVal:val},function () {
            //alert(val);
        });
    },
    searchSub: function (e) {
        e.preventDefault();
        var selVal = this.state.selVal;
        this.props.emit && this.props.emit(selVal);
    },
    render: function () {
        return (
            <div>
                <DropDown dropdownData={this.props.dropdownMenus} changeEv={this.backSelVal} selectVal={this.state.selVal} />
                <ChooseTime changeHandler={this.changeHandlerStart} num="7" id={(this.props.prefix?this.props.prefix:"")+"startTime"} />
                <ChooseTime changeHandler={this.changeHandlerEnd} num="0" id={(this.props.prefix?this.props.prefix:"")+"endTime"} />
                <Btn name="筛选" btnEvent={this.searchSub} />
            </div>
        )
    }
});

module.exports = TimeSearch;