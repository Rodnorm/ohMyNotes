import React from 'react';
import './App.scss';
import Welcome from './components/TextField/TextField.Component';
import SidebarMenu from './components/SidebarMenu/SidebarMenu.Component';
import ColorPicker from './components/ColorPicker/ColorPicker.Component';
import MyNotes from './components/MyNotes/MyNotes.Component';
import SignUpPage from './components/SignUp/SignUp.Component';
import LandingPage from './components/LandingPage/LandingPage.Component';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const  textArea = React.createRef()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false }
  }

  render() {
    return(
    <React.Fragment>
        {this.state.isLogged && <DefaultContainer />}
        {!this.state.isLogged && <LoginContainer />}
    </React.Fragment>
    )
  }
}

const getColor = (val) => {
  textArea.current.style.backgroundColor = `rgb(${val})`
  textArea.current.children[0].style.backgroundColor = `rgb(${val})`
}

const LoginContainer = () => (
  <Router>
    <Route exact path={ROUTES.LANDING} component={LandingPage}/>
    {/* <Route path={ROUTES.LANDING} render={() => <Redirect to={ROUTES.SIGNUP} />}/>
    <Route exact path={ROUTES.SIGNUP} component={SignUp} /> */}
  </Router>
);

const DefaultContainer = () => (
  <Router>
    <SidebarMenu></SidebarMenu> 
    <ColorPicker color={getColor} />
    <Route exact path={ROUTES.LANDING} component={Home} />
    <Route path={ROUTES.MY_NOTES} component={MyNotes} />
  </Router>
);

function SignUp() {
  return(
    <SignUpPage />
  );
}

function Home() {
  return(
  <div className="text-area" ref={ textArea }>
    <Welcome></Welcome>
  </div>
  );
}


export default App;
