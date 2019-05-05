import React from 'react'
import Logo from './logo.png';
import './logo.less'

export default function(){
    return (
        <div className="logo-container">
            <img src={Logo} alt="logo" className="logo-img"></img>
        </div>
    )
}