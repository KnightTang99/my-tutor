/**
 * 封装能发送ajax请求的模块
 */
import axios from 'axios';
export default function ajax(url,method,parma){
    if(method.toUpperCase()==='GET'){
        let lateUrl = '';
        if(parma){
            for(let key in parma){
                lateUrl += key + '=' + parma[key] + '&';
            }
            lateUrl = url + '?' + lateUrl.substring(0,lateUrl.length-1)
        }else{
            lateUrl = url
        }
        return axios.get(lateUrl);
    }else if(method.toUpperCase()==='POST'){
        return axios.post(url,parma);
    }
}