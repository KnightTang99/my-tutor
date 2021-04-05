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
class Teacher extends Component{
    state = {
        headText:'',
        university:'',
        strengths:'',
        freetime:'',
        selfIntroduction:'',
        aa:'dnj'
    }
    handleChange = (name,val) => {
        this.setState({[name]:val});
    }
    getHeader = (headText) => {
        this.setState({headText});
    }
    componentDidMount(){
        // this.props.history.replace('/main/teacher');
        // console.log(this.props.location);
        // window.a = 1;
        // if(window.a===1){
        //     window.location.reload();
        //     window.a=2;
        // }
        // console.log(1)
        // let url = window.location.href;
        // console.log(url)
        // if(url.indexOf('r=')===-1){
        //     console.log('wondow.open');
        //     window.open(url+'?r=1','_self');
            
        // }
        console.log(document.cookie);
    }
    compeleteUserInfo = ()=>{
        console.log(this.state,11);
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
                    <InputItem onChange={(val)=>{this.handleChange('university',val)}}>在读大学:</InputItem>
                    <InputItem onChange={(val)=>{this.handleChange('strengths',val)}}>擅长科目:</InputItem>
                    <InputItem onChange={(val)=>{this.handleChange('freetime',val)}}>课余时间：</InputItem>
                    <TextareaItem title="自我介绍:" frameoverflow='visible' rows={3} onChange={(val)=>{this.handleChange('selfIntroduction',val)}}></TextareaItem>
                </List>
                <WhiteSpace />
                <Button type="primary" onClick={()=>{this.compeleteUserInfo()}}>保存</Button>
                </WingBlank>
            </div>
        )

    }

}
export default connect(
    state=>({user:state.user}),
    {upDataUserInfo}
)(Teacher);