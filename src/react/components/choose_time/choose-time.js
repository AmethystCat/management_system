/**
 * Created by Administrator on 2016/2/1.
 *
 *
 *
 */

Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
};
var React = require('react');
/*选择时间H5的input[type=date];*/
var ChooseTime = React.createClass({
    addDate: function(date,days){
        var d=new Date(date);
        d.setDate(d.getDate()+days);
        var m=d.getMonth()+1;
        m = m>10?m:("0"+m);
        return d.getFullYear()+'-'+m+'-'+d.getDate();
    },
    nowTime: function(now){
        return now.format("yyyy-MM-dd hh:mm:ss");
    },
    getInitialState: function() {
        var val = this.addDate(new Date(),-parseInt(this.props.num));
        var d = new Date();
        var m=d.getMonth()+1;
        m = m>10?m:("0"+m);
        var month = d.getFullYear()+"-"+m+"-01";
        //if(this.props.num==7){
        //    $("#"+this.props.id).val(this.nowTime(new Date(val)));
        //}else {
        //    $("#"+this.props.id).val(this.nowTime(new Date(month)));
        //}
        return {
            val: val,
            date: month,
            format: "YYYY-MM-DD",
            inputFormat: "YYYY-MM-DD",
            mode: "date"
        }
    },
    change: function (event){
        var val = this.refs.timeNode.value;
        var isTrue = this.props.changeHandler && this.props.changeHandler(val);
        if(!isTrue) return;
        return this.setState({val: val});
    },
    render: function () {
        return (
            <input className="form-control"
               id={this.props.id}
               type="date" onChange={this.change}
               defaultValue={this.state.val}
               data-val={this.state.val}
               ref="timeNode"
            />
        );
    }
});

module.exports = ChooseTime;