import React,{Component} from 'react';
import {List,Grid,WingBlank,Flex} from 'antd-mobile';


export default class Heder extends Component{
    constructor(props){
        super(props);
    //   this.headList = [...new Array(20)];console.log(this.headList);
        this.headList = Array.from(new Array(20)).map((_val, i) => ({
            icon: require(`../../assets/imgs/headers/头像${i+1}.png`),
            text: '头像'+(i+1)
          }));
        // this.headList =this.headList.map((_val, i) => {
        //     console.log(1);
        //     return {
        //     icon: require(`../../assets/imgs/headers/头像${i+1}.png`),
        //     text: '头像'+(i+1)
        //   }});console.log(this.headList);
          this.state={
              headImg:null,
          }
    }
    
    selectHeader = (headImg)=>{
        this.setState({headImg});
        this.props.getHeader(headImg.text);
    }
    // componentDidMount(){
    //     // let ele = document.getElementById("e");
    //     let carousel = document.querySelector('.slider-list');
    //     console.log( carousel);
    //     carousel.style.heigth=269+'px';
    //     // this.setState({})
    //     console.log(carousel.style.heigth);
    // }
    render(){
        const {headImg} = this.state;
        const listHeaderDesc = headImg===null? '请选择头像' : (
                <Flex justify='center'>
                        <p>已选择头像:</p>
                        <img src={headImg.icon} alt=""/>
                </Flex>
        )
        // console.log(this.headList);
        return (
            <div id='eleheight'>
                <WingBlank>
                        <List renderHeader={()=>listHeaderDesc}>
                            <Grid data={this.headList} isCarousel carouselMaxRow={3} itemStyle={{height:'80px'}} onClick={this.selectHeader}/>
                        </List>
                </WingBlank>
            </div>
        )

    }

}