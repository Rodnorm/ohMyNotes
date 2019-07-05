import React from 'react';
import './App.scss';
import TextField from './components/TextField/TextField.Component';
import { withFirebase } from './components/Firebase';
import SidebarMenu from './components/SidebarMenu/SidebarMenu.Component';
import ColorPicker from './components/ColorPicker/ColorPicker.Component';
import MyNotes from './components/MyNotes/MyNotes.Component';
import SignUpPage from './components/SignUp/SignUp.Component';
import LandingPage from './components/LandingPage/LandingPage.Component';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import SignInPage from './components/SignIn/SignIn.Component';
import Profile from './components/Profile/Profile.Component';

const mainView = React.createRef();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authUser: null }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser }) 
        : this.setState({ authUser: null })
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return(
    <React.Fragment>
        {this.state.authUser ? <DefaultContainer /> : <LoginContainer />}
    </React.Fragment>
    )
  }
}

const setBackgroundColor = (newColor) => {
  mainView.current.children[0].children[1].style.backgroundColor = `rgb(${newColor})`;
  mainView.current.children[0].style.backgroundColor = `rgb(${newColor})`;
  mainView.current.children[1].style.backgroundColor = `rgb(${newColor})`;
}

function LoginContainer() {
  return(
    <Router>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGNUP} render={() => <SignUpPage />} />
      <Route exact path={ROUTES.SIGNIN} render={() => <SignInPage />} />
    </Router>
  )
};

function DefaultContainer(){
  return (
        <Router>
          <SidebarMenu />
          <div className="content">
            <Route exact path={ROUTES.LANDING} component={MainWritingView} />
            <Route path={ROUTES.MY_NOTES} component={MyNotes} />
            <Route exact path={ROUTES.MY_PROFILE} component={Profile}/>
          </div>
        </Router>
  )
};

function MainWritingView() {
  return (<div className="main-writing-view" ref={mainView}>
            <TextField />
            <ColorPicker color={setBackgroundColor} />
          </div>
  )
}

export default withFirebase(App);
