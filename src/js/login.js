/**
 * Created by john on 2016/2/22.
 */
$(function () {
    var userInput = $('#username'),
        passInput = $('#password'),
        params = {};

    $('#loginBtn').on('click',function(e){
        e.preventDefault();
        if (!userInput.val()) {
            H.Modal({
                content:'用户名不能为空',
                okCallback: function () {
                    userInput.focus();
                }
            });
            return;
        }
        if (!passInput.val()) {
            H.Modal({
                content: '密码不能为空',
                okCallback: function () {
                    passInput.focus();
                }
            });
            passInput.focus();
            return;
        }
        params.username = userInput.val();
        params.password = passInput.val();
        H.server.login(params,function(res){
            if (res.code == 0) {
                window.location.href = '/common/main';
            } else {
                H.Modal(res.message);
            }
        });
    });


});