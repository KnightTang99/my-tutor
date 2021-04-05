/**
 * 
 */
import {combineReducers} from 'redux';
import {AUTH_SUCCESS,ERROR_MSG} from './action-types';
const initUser = {
    username:'',
    type:'',
    msg:'',
}
function user (state=initUser,action) {
    switch(action.type){
        case AUTH_SUCCESS:
            return {...action.data}
        case ERROR_MSG:
            console.log('userMsg',action.data);
            return {...state,msg:action.data}
        default:
            return state
    }
}
export default combineReducers({
    user,
});