/**
 * 个人信息管理
 *
 * */
import React from "react";

let MessControl = React.createClass({
    getInitialState(){
        return {
            isFirstSet : true
        }
    },
    componentDidMount(){
        let server = H.server;
        server.user_profile({},(res)=>{
            if (res.code === 0) {
                this.setState({
                    isFirstSet: !res.data.opt_password_set
                })
            } else {
                H.Modal(res.message);
            }
        });
    },
    getIsFirstSet(){
        if (!this.state.isFirstSet) {
            return (
                <div className="form-group">
                    <label htmlFor="oldPassword">原密码</label>
                    <input type="password" className="form-control" id="oldPassword" placeholder="请输入旧有密码，忘记密码请联系管理员进行获取"/>
                </div>
            );
        }
    },
    setNewPass(e){
        e.preventDefault();
        if (!this.validateForm()) return false;

        let server = H.server,
            params = {};

        params.new_password = $('#newPassword').val();
        params.new_password_confirmation = $('#passwordConfirm').val();
        if (!this.state.isFirstSet) {
            params.old_password = $('#oldPassword').val();
        }
        server.user_optpassword_set(params,(res)=>{
            this.initForm();
            H.Modal(res.message);
        });
    },
    initForm(){
        $('#newPassword').val('');
        $('#passwordConfirm').val('')
    },
    validateForm(){
        let newPasswordInput = $('#newPassword'),
            passwordConfirmInput = $('#passwordConfirm'),
            tip = $('.tip');
        if (newPasswordInput.val().length < 6) {
            tip.text('密码不能少于6位');
            newPasswordInput.focus();
            return false;
        }
        if (!passwordConfirmInput.val()) {
            tip.text('新密码不能为空');
            passwordConfirmInput.focus();
            return false;
        }
        if (newPasswordInput.val() !== passwordConfirmInput.val()) {
            tip.text('两次密码输入不一样，请重新输入');
            passwordConfirmInput.focus();
            return false;
        }
        if (!this.state.isFirstSet && !$('#oldPassword').val()) {
            tip.text('请输入旧有密码');
            $('#oldPassword').focus();
            return false;
        }
        tip.text('');
        return true;
    },
    render(){
        return (
            <div className="form-w" >
                <form action="">
                    {this.getIsFirstSet()}
                    <div className="form-group">
                        <label htmlFor="newPassword">新密码</label>
                        <input type="password" className="form-control" id="newPassword" placeholder="请输入新密码，密码位数不得少于6位"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">新密码确认</label>
                        <input type="password" className="form-control" id="passwordConfirm" placeholder="请输入新密码确认"/>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.setNewPass}>确认</button>
                    <span className="tip"></span>
                </form>
            </div>
        );
    }
});

export default MessControl;