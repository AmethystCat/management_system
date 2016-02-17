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
            startTime:"2016-01-12T03:05",
            endTime:"2016-01-12T03:06"
        }
    },
    changeHandlerStart: function(time){  /*从子组件传过来的开始时间;*/
        this.setState({startTime: time});
    },
    changeHandlerEnd: function(time){  /*从子组件传过来的结束时间;*/
        this.setState({endTime: time});
    },
    screening: function (){ //筛选按键点击事件;
        /*var endTimeVal = this.refs.endTime.value.trim();*/
        //console.log(this.state.startTime);
        //console.log(this.state.endTime);
    },
    render: function () {
        return (
            <div className="time-search-w">
                <ChooseTime changeEv={this.changeHandlerStart} val={this.state.startTime} id="startTime" />
                <ChooseTime changeEv={this.changeHandlerEnd} val={this.state.endTime} id="endTime" />
                <Btn name="筛选" btnEvent={this.screening} />
            </div>
        )
    }
});

module.exports = TimeSearch;
