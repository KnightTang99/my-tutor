import React,{Component} from 'react';

import './logo.css';
import logo from './BBB.png';
export default class Logo extends Component{

    render(){

        return (

            <div className="logo">
                <img src={logo} alt=""/>
            </div>
        )

    }

}