import React,{Component} from 'react';
import {
    NavBar,
    List,
    WingBlank,
    WhiteSpace,
    InputItem,
    Button,
    Toast
} from 'antd-mobile';
import {connect} from 'react-redux';

import {asyncLogin} from '../../redux/actions';
import Logo from '../../components/logo/logo';

const Item = List.Item
class Login extends Component{
    state={
        username:'',
        password:''
    }
    toRegister = () => {
        this.props.history.replace('/register');
    }
    handleChange = (attr,val)=>{
        this.setState({[attr]:val});
    }
    login = () =>{
        this.props.asyncLogin(this.state);//触发异步的登录action
    }
    componentWillReceiveProps(newProps){
        const {msg} = newProps.user;
        if(msg){
            Toast.fail(msg,1,()=>{
                this.props.history.push('/register');
            });
            
        }else{
            Toast.success('登录成功',0.5,()=>{
                this.props.history.push('/main');
            });
        }
    }
    render(){
        return (

            <div>
                <NavBar>知&nbsp;乎&nbsp;家&nbsp;教</NavBar>
                <WhiteSpace />
                <Logo />
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <InputItem onChange={(value)=>{this.handleChange('username',value)}} placeholder="请输入用户名">用户名：</InputItem>
                        <InputItem type="password" onChange={(value)=>{this.handleChange('password',value)}} placeholder="请输入密码">密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <Item>
                            <Button type="primary" onClick={this.login}>登录</Button>
                            <WhiteSpace />
                            <Button onClick={this.toRegister}>注册</Button>
                        </Item>
                    </List>
                </WingBlank>
            </div>
        )

    }

}
export default connect (
    (state)=>({user:state.user}),
    {asyncLogin}
)(Login)