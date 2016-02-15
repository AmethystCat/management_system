/**
 * Created by Administrator on 2016/1/29.
 * 表格组件
 * @param headTextArr = ['收款ID','订单ID','付款人','实收金额','订单金额','优惠金额','付款方式','确认人','资金位置','付款确认时间','操作']
 * @param data = [
             {
             "id":  1234456,
             "main_order_no": "12320160127132112345",
             "buyer_name": "张工",
             "shop_name": "食品房子",
             "pay_amount": 12300,
             "order_amount": 12800,
             "deduct_amount": 500,
             "pay_channel": 2,
             "money_place": 1,
             "order_operator_name": "晓欣",
             "updated_at": "2016-01-25 10:32:11",
             "status": 2,
             "page": 1,
             "total_count": 200
             }]
 */
var React = require('react');

/*表格头*/
var TableHead = React.createClass({
    render: function () {
        return (
            <tr>
                {
                    this.props.tableTile.map(function (title,index) {
                        return <th key={index}>{title}</th> ;
                    })
                }
            </tr>
        )
    }
});
/*单元格 TD*/
var TableTd = React.createClass({
    render: function () {
        return (
            <td>{this.props.data}</td>
        )
    }
});
/*表行*/
var TableTr = React.createClass({
    render: function () {
        var payChannel = {1:'打款到银行卡',2:'微信支付',3:'支付宝'};
        var moneyPlace = {1:'支付宝',2:'农行卡',3:'微 信'};
        var tdArr = [];
        var data = this.props.trData;
        if(this.props.types == 1){
            tdArr.push(<td key="1">{data.id}</td>);
            tdArr.push(<td key="2">{data.main_order_no}</td>);
            tdArr.push(<td key="3">{data.buyer_name + "(" + data.shop_name +")"}</td>);
            tdArr.push(<td key="4">{data.pay_amount}</td>);
            tdArr.push(<td key="5">{data.order_amount}</td>);
            tdArr.push(<td key="6">{data.deduct_amount}</td>);
            tdArr.push(<td key="7">{payChannel[data.pay_channel]}</td>);
            tdArr.push(<td key="8">{data.order_operator_name}</td>);
            tdArr.push(<td key="9">{moneyPlace[data.money_place]}</td>);
            tdArr.push(<td key="10">{data.updated_at}</td>);
            tdArr.push(<td key="11" style={{width: '10%'}}><button className="btn btn-default btn-xs">撤回</button></td>);
        }
        return (
            <tr>
                {tdArr}
            </tr>
        )
    }
});

/*表body*/
var TableBody = React.createClass({
    render: function () {
        var types = this.props.types;
        return (
            <tbody>
            {
                this.props.data.map(function (data,index){
                    return <TableTr key={index} types={types} trData={data} />
                })
            }
            </tbody>
        )
    }
});
/*整个表*/
var Table = React.createClass({
    render: function () {
        var headTextArr = this.props.titles,
            data = this.props.res;
        return (
            <table className="table table-bordered table-hover table-responsive">
                <thead><TableHead tableTile={headTextArr} /></thead>
                {/*<TableBody data={data} types={this.props.types} />*/}
                {this.props.children}
            </table>
        )
    }
});


module.exports = Table;