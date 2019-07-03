import React, { Component } from 'react';
import './Profile.Component.scss';

class Profile extends Component {
    render() {
        return(
            <React.Fragment>
                <h1>App Settings</h1>
                <ChangePassword />
            </React.Fragment>
        )
    }
}

const ChangePassword = (props) => (
    <p>Change Password</p>
)

export default Profile;