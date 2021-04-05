/**
 * 产生多个action的工厂函数
 */
import {reqRegister,reqLogin,upData} from '../api/index';
import {AUTH_SUCCESS,ERROR_MSG} from './action-types';
//成功时对应的action
export const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
//发生错误时对应的action
export const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});

//异步action
//register注册接口异步action
export const register = (user) => {
    const {username,password,passwordSure,type} = user
    if(!username){
        return errorMsg('请输入用户名');
    }else if(!password){
        return errorMsg('请输入密码');
    }else if(password!==passwordSure){
        return errorMsg('两次密码不一致');
    }
    return async (dispatch) => {
        const result = await reqRegister({username,password,type});
        // console.log(result.data.code);
        if(+result.data.code===0){
            dispatch(authSuccess(result.data.data));
        }else if(+result.data.code===1){
            dispatch(errorMsg(result.data.msg));
        }
    } 
}

//登陆接口异步action
export function asyncLogin (user) {
    const {username,password} = user;
    if(!username){
        return errorMsg('请输入用户名');
    }else if(!password){
        return errorMsg('请输入密码');
    }
    return async dispatch => {
        const result = await reqLogin(user);
        // console.log(result);
        if(+result.data.code===0){
            dispatch(authSuccess(result.data.data));
        }else if(+result.data.code===1){
            dispatch(errorMsg(result.data.msg));
        }
    }
}

//用户完善信息对应的action
export function upDataUserInfo(upDataMsg){
    return async dispatch=>{
        const result = await upData(upDataMsg);
        if(+result.data.code===1){
            dispatch(errorMsg(result.data.msg));
        }else if(+result.data.code===0){
            dispatch(authSuccess(result.data.data));
        }
    }
}