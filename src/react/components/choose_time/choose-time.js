/**
 * Created by Administrator on 2016/2/1.
 * 选择时间
 */
var React = require('react');

/*选择时间H5的input[type=date];*/
var ChooseTime = React.createClass({
    getInitialState: function() {
        return {
            optionArr: ['hellod12455631','hela1l222'],
            val: "2016-01-12T03:05"
        }
    },
    handleChange: function (event) {
        this.setState({val: event.target.value}, function () {
            if(this.props.changeEv){
                this.props.changeEv(this.state.val);
            }
        });
        /*var newTime = this.state.val ;*/

    },
    render: function () {
        var value = this.state.val;
        return (
            <input className="form-control" type="datetime-local" value={this.props.val} onChange={this.handleChange} />
        )
    }
});

module.exports = ChooseTime;