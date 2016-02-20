/**
 * 个人信息管理
 *
 * */
import React from "react";

let MessControl = React.createClass({
    render(){
        return (
            <div className="form-w" >
                <form action="">
                    <div className="form-group">
                        <label htmlFor="oldPassword">原密码</label>
                        <input type="password" className="form-control" id="oldPassword" placeholder="请输入旧有密码，忘记密码请联系管理员进行获取"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">新密码</label>
                        <input type="password" className="form-control" id="newPassword" placeholder="请输入新密码，密码位数不得少于6位"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">新密码确认</label>
                        <input type="password" className="form-control" id="passwordConfirm" placeholder="请输入新密码确认"/>
                    </div>
                    <button type="submit" className="btn btn-default">确认</button>
                    <span className="tip"></span>
                </form>
            </div>
        );
    }
});

export default MessControl;