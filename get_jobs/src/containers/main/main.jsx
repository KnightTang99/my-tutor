import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import Teacher from '../teacherInfo/teacherInfo';
import Student from '../studentInfo/studentInfo';

class Main extends Component{
   
    
    render(){
        if(document.cookie.indexOf('userId')!==-1){
            return (

                <div>
                    <Switch>
                        <Route path="/main/teacherInfo" component={Teacher} />
                        <Route path="/main/studentInfo" component={Student} />
                    </Switch>
                </div>
            )
        }else{
            return (
                <Redirect to='/login'/>
            )
        }
      

    }

}
export default connect(
    state => ({}),
    {}
)(Main)