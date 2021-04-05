import React,{Component} from 'react';

export default class Test extends Component{
    state={
        isShow:true
    }
    changeStyle = () => {
        this.setState({isShow:!this.state.isShow})
    }
    render(){

        return (

            <div style={{display:this.state.isShow?'block':'none',width:'100px',height:'100px',backgroundColor:'red'}}>

            </div>
        )

    }

}