import React from 'react';
import './SidebarMenu.Component.scss';
import { faCoffee, faStickyNote, faCogs, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

class SidebarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: true,
            myNotes: false,
            settings: false,
            logout: false,
            activeColor: 'rgb(237, 173, 250)'
        }
        
    }
    toggleActive = (key) => {
        switch(key) {
            case 'menu' :
                this.setState({
                    menu: true,
                    myNotes: false,
                    settings: false,
                    logout: false,
                });
                break;
            case 'myNotes' :
                this.setState({
                    menu: false,
                    myNotes: true,
                    settings: false,
                    logout: false,
                });
                break;
            case 'settings' :
                this.setState({
                    menu: false,
                    myNotes: false,
                    settings: true,
                    logout: false,
                });
                break;
            case 'logout' :
                this.setState({
                    menu: false,
                    myNotes: false,
                    settings: false,
                    logout: true,
                });
                break;
            default:
                console.log('s');
            break;
        }
    }
    render() {
        // accordion for 'my notes' section-->  https://reactjsexample.com/collapse-library-based-on-css-transition-for-react/
        return <nav className="sidebar-menu">
            <ul>
                <Link to={ROUTES.LANDING}>
                    <li onClick={() => this.toggleActive('menu')}> <FontAwesomeIcon icon={faCoffee} color={this.state.menu ? this.state.activeColor : 'white'} size="4x"/> Menu </li>
                </Link>
                <Link to={ROUTES.MY_NOTES}>
                    <li onClick={() => this.toggleActive('myNotes')}> <FontAwesomeIcon icon={faStickyNote} color={this.state.myNotes ? this.state.activeColor : 'white'} size="4x"/> Minhas Notas </li>
                </Link>
                <Link to={ROUTES.SETTINGS}>
                    <li onClick={() => this.toggleActive('settings')}> <FontAwesomeIcon icon={faCogs} color={this.state.settings ? this.state.activeColor : 'white'} size="4x"/> Configurações </li>
                </Link>
                <Link to={ROUTES.LOGOUT}>
                    <li onClick={() => this.toggleActive('logout')}> <FontAwesomeIcon icon={faSignOutAlt} color={this.state.logout ? this.state.activeColor : 'white'} size="4x"/> Logout </li>
                </Link>
                <Link to={ROUTES.MY_PROFILE}>
                    <li onClick={() => this.toggleActive('logout')}> <FontAwesomeIcon icon={faUser} color={this.state.logout ? this.state.activeColor : 'white'} size="4x"/> User </li>
                </Link>
            </ul>
        </nav>
    }
}

export default SidebarMenu;