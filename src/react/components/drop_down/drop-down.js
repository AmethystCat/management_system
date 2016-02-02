/**
 * Created by Administrator on 2016/2/1.
 * 下拉选择
 */
var React = require('react');

/*选择下拉框,select标签;*/
var DropDown = React.createClass({
    getInitialState: function() {
        return {
            optionArr: ['hello1111111','hell2']
        }
    },
    selChange: function () {
        if(this.props.changeEv) {
            this.props.changeEv(this.refs.selectNode.value);
        }
    },
    render: function () {
        return (
            <select className="form-control" onChange={this.selChange} ref="selectNode">
                {
                    React.Children.map(this.state.optionArr,function (name,index) {
                        return <option value={index} >{name}</option>;
                    })
                }
            </select>
        );
    }
});

module.exports = DropDown;