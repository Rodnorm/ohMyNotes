import React from 'react';
import './SidebarMenu.Component.scss';
import { faCoffee, faStickyNote, faCogs, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

class SidebarMenuWithRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            main: true,
            myNotes: false,
            settings: false,
            logout: false,
            myProfile: false,
            activeColor: 'rgb(237, 173, 250)'
        }
        
    }

    handleLogout = () => {
        this.props.firebase
        .doSignOut()
        .then(() => {
            this.props.history.push(ROUTES.LANDING);
        });
    }

    toggleActive = (key) => {
        Object.keys(this.state).forEach(el => {
            if (el !== 'activeColor') {
                el === key
                ? this.setState({[el]: true})
                : this.setState({[el]: false})
            }
        });
        if (key === 'logout') {
            this.handleLogout();
        }
    }
    render() {

        return <nav className="sidebar-menu">
                    <ul>
                        <Link to={ROUTES.LANDING}>
                            <li onClick={() => this.toggleActive('main')}> <FontAwesomeIcon icon={faCoffee} color={this.state.main ? this.state.activeColor : 'white'} size="4x"/> Menu </li>
                        </Link>
                        <Link to={ROUTES.MY_NOTES}>
                            <li onClick={() => this.toggleActive('myNotes')}> <FontAwesomeIcon icon={faStickyNote} color={this.state.myNotes ? this.state.activeColor : 'white'} size="4x"/> Minhas Notas </li>
                        </Link>
                        <Link to={ROUTES.SETTINGS}>
                            <li onClick={() => this.toggleActive('settings')}> <FontAwesomeIcon icon={faCogs} color={this.state.settings ? this.state.activeColor : 'white'} size="4x"/> Configurações </li>
                        </Link>
                        <Link to={ROUTES.MY_PROFILE}>
                            <li onClick={() => this.toggleActive('myProfile')}> <FontAwesomeIcon icon={faUser} color={this.state.myProfile ? this.state.activeColor : 'white'} size="4x"/> User </li>
                        </Link>
                        <Link to={ROUTES.LANDING}>
                            <li onClick={() => this.toggleActive('logout')}> <FontAwesomeIcon icon={faSignOutAlt} color={this.state.logout ? this.state.activeColor : 'white'} size="4x"/> Logout </li>
                        </Link>
                    </ul>
            </nav>
    }
}

const SidebarMenu = compose(withRouter, withFirebase)(SidebarMenuWithRouter)

export default SidebarMenu;
