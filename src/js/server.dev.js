(function(){

var server = H.namespace('server');

var contextPath = "/mock";
/**
 * 发起请求方法
 * @param type{get|post}    请求类型
 * @param api               请求地址 url
 * @param parameters        请求发布参数
 * @param success           回调方法,(错误也会调用)
 * @param async             事后异步请求
 * @returns {*}             ajax对象
 */
var send = function (type, api, parameters, success, async) {
    typeof success == 'function' || (success = function () {
    });
    var request = $.ajax({
        url: api + "?r=" + Math.random(),
        data: parameters,
        type: type,
        dataType: 'json',
        async: true,
        cache: false,
        headers: {"Cache-Control": "no-cache", "Accept": "application/json"},
        timeout: 300000,
        success: function (data, textStatus, jqXHR) {
            success.call(this, data, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {

            //alert(jqXHR+errorThrown+textStatus);
            if (jqXHR.status == 401) {
                location.href = contextPath;
            } else {
                if (!errorThrown) {
                    return false;
                }
                var errors = {
                    101: "网络不稳定或不畅通，请检查网络设置",
                    403: "服务器禁止此操作！",
                    500: "服务器遭遇异常阻止了当前请求的执行<br/><br/><br/>"
                };

                var msg = null;
                switch (textStatus) {
                    case "timeout":
                        msg = "网络连接超时，请检查网络是否畅通！";
                        break;
                    case "error":
                        if (errors[jqXHR.status]) {
                            var data = null;
                            try {
                                data = jQuery.parseJSON(jqXHR.responseText);
                            } catch (e) {
                            }
                            if (data && data.message) {
                                msg = data.message;
                            } else {
                                msg = errors[jqXHR.status];
                            }
                        } else {
                            msg = "服务器响应异常<br/><br/>" + (jqXHR.status == 0 ? "" : jqXHR.status) + "&nbsp;" + errorThrown;
                        }
                        break;
                    case "abort":
                        msg = null;//"数据连接已被取消！";
                        break;
                    case "parsererror":
                        msg = "数据解析错误！";
                        break;
                    default:
                        msg = "出现错误:" + textStatus + "！";
                }
                if (errorThrown.code != null && errorThrown.message != null && !errors[errorThrown.code]) {
                    msg += "</br>[code:" + errorThrown.code + "][message:" + errorThrown.message + "]" + (null == errorThrown.stack ? "" : errorThrown.stack);
                }
                if (msg == null) {
                    msg = '';
                }
                success.call(this, {code: jqXHR.status, msg: msg}, textStatus, jqXHR, errorThrown);
            }
        }
    });
    return request;
};

    /**
     * 登录/退出
     * */
    // 登录
    server.login = function (data, callback) {
        return send('post', contextPath + '/common/login.json', data, callback);
    };
    // 退出
    server.logout = function (data, callback) {
        return send('post', contextPath + '/common/logout.json', data ,callback);
    };

    /**
    * 用户信息
    * */
    // 获取用户信息
    server.user_profile = function(data, callback){
        return send('get', contextPath + '/user/profile.json', data, callback);
    };
    // 修改用户二级密码
    server.user_optpassword_set = function(data, callback){
        return send('post', contextPath + '/user/opt-password/set.json', data, callback);
    };

    /**
     * 导航
     * */
    server.nav = function (data, callback) {
        return send('get', contextPath + '/common/nav.json', data, callback);
    };

    /**
     * 首页
     * */
    server.home_data = function (data, callback) {
        return send('get', contextPath + '/home.json', data, callback);
    };

    /**
     * 已收款
     *
     * */

    // 已确认收款列表和待确认收款列表
    server.deposit_order_list = function (data, callback) {
        return send('get', contextPath + '/deposit/order/list.json', data, callback);
    };
    // 订单收款之后推送给财务收款信息
    server.deposit_order_apply = function (data, callback) {
        return send('post', contextPath + '/deposit/order/apply.json', data, callback);
    };
    // 确认当前的收款信息无误
    server.deposit_order_confirm = function (data, callback) {
        return send('post', contextPath + '/deposit/order/confirm.json', data, callback);
    };
    // 撤回收款记录
    server.deposit_order_cancel = function (data, callback) {
        return send('post', contextPath + '/deposit/order/cancel.json', data, callback);
    };


    /**
     * 商家提现
     *
     * */

    // 提款列表
    server.withdraw_order_list = function (data, callback) {
        return send('get', contextPath + '/withdraw/order/list.json', data, callback);
    };
    // 人工大款成功后，确认打款成功
    server.withdraw_order_pay_manual_confirm = function (data, callback) {
        return send('post', contextPath + '/withdraw/order/pay/manual/confirm.json', data, callback);
    };
    // 系统打款
    server.withdraw_order_pay_auto_do = function (data, callback) {
        return send('post', contextPath + '/withdraw/order/pay/auto/do.json', data, callback);
    };
    // 撤回打款
    server.withdraw_order_cancel = function (data, callback) {
        return send('post', contextPath + '/withdraw/order/cancel.json', data, callback);
    };
    // TODO 接收系统代付结果通知

    // 提款申请
    server.withdraw_order_apply = function (data, callback) {
        return send('post', contextPath + '/withdraw/order/apply.json', data, callback);
    };
    // 财务进行重新补款
    server.withdraw_order_reapply = function (data, callback) {
        return send('post', contextPath + '/withdraw/order/reapply.json', data, callback);
    };
    //查询订单详情数据接口
    server.withdraw_order_info_list = function (data, callback) {
        return send('get', contextPath + '/withdraw/order/info/list.json', data, callback);
    };

    /*
    * 汇总对账接口
    */

    // 未结算
    server.not_settle = function (data, callback) {
        return send('post', contextPath + '/money/check/wait/list.json', data, callback);
    };
    // 获取历史对账数据
    server.history_data = function (data, callback) {
        return send('post', contextPath + '/money/check/history/list.json', data, callback);
    };
    // 历史对账统计
    server.history_count = function (data, callback) {
        return send('post', contextPath + '/money/check/history/statistics.json', data, callback);
    };
    // 扎账接口
    server.settle_accounts = function (data, callback) {
        return send('post', contextPath + '/money/check/wait/handle.json', data, callback);
    };
    // 添加补贴
    server.add_allowance = function (data, callback) {
        return send('post', contextPath + '/money/check/allowance/add.json', data, callback);
    };

    // 平台可用支出账号信息接口
    server.pay_bank_account = function (data, callback) {
        return send('get', contextPath + '/pay/bank/account.json', data, callback);
    };
})();