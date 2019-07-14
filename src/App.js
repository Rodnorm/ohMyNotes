import React from 'react';
import './App.scss';
import TextField from './components/TextField/TextField.Component';
import { withFirebase } from './components/Firebase';
import { compose } from 'recompose';
import SidebarMenu from './components/SidebarMenu/SidebarMenu.Component';
import ColorPicker from './components/ColorPicker/ColorPicker.Component';
import MyNotes from './components/MyNotes/MyNotes.Component';
import SignUpPage from './components/SignUp/SignUp.Component';
import LandingPage from './components/LandingPage/LandingPage.Component';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import SignInPage from './components/SignIn/SignIn.Component';
import Profile from './components/Profile/Profile.Component';
import './constants/Query.scss'

const mainView = React.createRef();

class AppBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authUser: null }
  }
  user;

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      this.user = authUser;
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
        {this.state.authUser ? <DefaultContainer user={this.user}/> : <LoginContainer />}
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

function DefaultContainer(user) {
  return (
        <Router>
          <SidebarMenu />
          <div className="content">
            <Route exact path={ROUTES.NOTE} render={()=> <MainWritingView user={user.user} />} />
            <Route exact path={ROUTES.LANDING} render={() => <MyNotes user={user.user} />}/>
            <Route exact path={ROUTES.MY_PROFILE} component={Profile}/>
          </div>
        </Router>
  )
};

class MainWriting extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      hasFinishedLoading: false
    }
  }
  componentWillMount() {
    if (this.props.history.location.state) {
      console.log('main-writing-view-render')
      const key = this.props.history.location.state.item;
      this.props.firebase
      .noteList(this.props.user.uid, this.props.history.location.state.item)
      .once('value').then(snapshot => {
        let value = snapshot.val();
        value.note.id = key;
        this.setState({ value, hasFinishedLoading: true });
      });
    }
  }

  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }

  render() {
    

    return (<div className="main-writing-view" ref={mainView}>
              {(this.props.history.location.state && this.state.hasFinishedLoading) && <TextField user={this.props.user} value={this.state.value.note} />}
              {!this.props.history.location.state && <TextField user={this.props.user} />}
              <ColorPicker color={setBackgroundColor} />
            </div>
    )
  }
}
const MainWritingView = compose(withRouter, withFirebase)(MainWriting)

const App = compose(withFirebase, withRouter)(AppBase)
export default withFirebase(App);
