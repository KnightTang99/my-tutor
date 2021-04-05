import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
    NavBar,
    List,
    WingBlank,
    WhiteSpace,
    InputItem,
    Radio,
    Button,
    Toast
} from 'antd-mobile';
import Logo from '../../components/logo/logo';
import {register} from '../../redux/actions';

const Item = List.Item
 class Register extends Component{
    state={
        username:'',
        password:'',
        passwordSure:'',
        type:'student',
        test:1
    }
    componentDidMount(){
        console.log('componentdidimount=====')
    }
    handleClick = () =>{
        this.props.register(this.state);
       
    }
    //提交注册请求，返回新的user时触发事件
    componentWillReceiveProps(newProps){
        //根据新的user的msg的值判断是否注册成功，如果成功则提示成功并跳转到用户信息完善界面，
        //如果失败则提示失败信息
        const {msg,type} = newProps.user;
        if(msg){
            Toast.fail(msg,2);
        }else{
            Toast.success('注册成功！！！',0.5,()=>{
                if(type==='teacher'){
                    this.props.history.replace('/main/teacherInfo');
                }else{
                    this.props.history.replace('/main/studentInfo');
                }
                
            });
        }
    }
    handleChange = (attr,val)=>{
        this.setState({[attr]:val});
    }
    //跳转到登陆页面
    toLogin = () =>{
        // this.setState({test:2});
        // console.log(this.state);
        // console.log(this.state.test,2);
        this.props.history.push('/login');
        // this.test.setState({isShow:!this.test.state.isShow})
        // this.test.changeStyle()
    }
    render(){
        const {type} = this.state;
        console.log('render======');
        return (
            <div>
                <NavBar>知&nbsp;乎&nbsp;家&nbsp;教</NavBar>
                <WhiteSpace />
                <Logo />
                <WhiteSpace />
                <WingBlank>
                    <List> 
                        <InputItem placeholder="请输入要用户名" onChange={(value)=>{this.handleChange('username',value)}}>用户名：</InputItem>
                        <InputItem placeholder="请输入密码" type="password" onChange={(value)=>{this.handleChange('password',value)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <InputItem placeholder="请确定密码" type="password" onChange={(value)=>{this.handleChange('passwordSure',value)}}>确认密码：</InputItem>
                        <Item>用户类型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='student'} onChange={()=>{this.handleChange('type','student')}}>学生</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='teacher'} onChange={()=>{this.handleChange('type','teacher')}}>老师</Radio>
                        </Item>
                        <Item>
                            <Button type="primary" onClick={this.handleClick}>注册</Button>
                            <WhiteSpace />
                            <Button onClick={this.toLogin}>登录</Button>

                        </Item>
                    </List>
                </WingBlank>
            </div>
        )

    }

}
export default connect(
    state =>({user:state.user}),
    {register}
)(Register);