import './LandingPage.Component.scss'
import React, { Component } from 'react';
import  { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const landingDiv = React.createRef();


class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page flex flex-jutify-center" ref={landingDiv}>
                <div className="flex shadow">
                    <h1 className="title">Oh, My Notes!</h1>
                </div>
                <button className="login-button"><Link to={ROUTES.SIGNIN}>Enter</Link></button>
                <p className="thank-you-note"> Photo by Min An from Pexels </p>
            </div>
        );
    }
}

export default withRouter(LandingPage);