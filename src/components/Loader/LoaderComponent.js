import React, { Component } from 'react';
import logo from '../../assets/imgs/loader.gif';
import './LoaderComponent.scss';

export default class Loader extends Component {
    render() {
        return(<div className="loader"><img src={logo} alt='Loading image'/></div>)
    }
}