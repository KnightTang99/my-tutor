/**
 * 包含N个请求后台接口的函数
 */
import ajax from './ajax'
export const reqRegister = (user) => ajax('/register','POST',user);
export const reqLogin = (user) => ajax('/login','post',user);
export const upData = (updataMsg) => ajax('/updata','post',updataMsg);