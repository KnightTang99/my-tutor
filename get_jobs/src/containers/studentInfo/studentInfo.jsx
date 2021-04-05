import React,{Component} from 'react';
import {
    NavBar,
    List,
    InputItem,
    TextareaItem,
    WingBlank,
    WhiteSpace,
    Button,
    Toast
} from 'antd-mobile';
import {connect} from 'react-redux';

import {upDataUserInfo} from '../../redux/actions'

import Header from '../../components/header/header';
class Student extends Component{
    state = {
        headText:'',
        studentTime:'',
        salary:'',
        studendCondition:'',
        positionRequirement:''
    }
    handleChange = (name,val) => {
        this.setState({[name]:val});
    }
    getHeader = (headText) => {
        this.setState({headText});
    }
    completeStudentInfo = ()=>{
        let userInfo = {};
        for(var key in this.state){
            if(this.state[key]){
                userInfo[key] = this.state[key]
            }
        }
        console.log(userInfo);
        this.props.upDataUserInfo(userInfo)
    }
    componentWillReceiveProps(newProps){
        const user = newProps.user;
        if(user.msg){
            Toast.fail(user.msg,1,()=>{
                this.props.history.push('/login');
            });
        }else{
            Toast.success('保存成功',0.5,()=>{
                this.props.history.push('/main');
            });
        }
    }
    render(){

        return (
            
            <div>
                <NavBar>信&nbsp;息&nbsp;完&nbsp;善</NavBar>  
                <Header getHeader={this.getHeader}/>
                <WhiteSpace />
                <WingBlank>
                <List>
                    <InputItem onChange={(val)=>{this.handleChange('studentTime',val)}}>家教时间:</InputItem>
                    <InputItem onChange={(val)=>{this.handleChange('salary',val)}}>家教薪水:</InputItem>
                    <TextareaItem title="学生情况:" rows={3} onChange={(val)=>{this.handleChange('studendCondition',val)}}></TextareaItem>
                    <TextareaItem title="家长要求:" rows={3} onChange={(val)=>{this.handleChange('positionRequirement',val)}}></TextareaItem>
                </List>
                <WhiteSpace />
                <Button type="primary" onClick={()=>{this.completeStudentInfo()}}>保存</Button>
                </WingBlank>
            </div>
        )

    }

}
export default connect(
    state=>({user:state.user}),
    {upDataUserInfo}
)(Student);