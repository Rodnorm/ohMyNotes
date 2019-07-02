import React from 'react';
import './App.scss';
import Welcome from './components/TextField/TextField.Component';
import SidebarMenu from './components/SidebarMenu/SidebarMenu.Component';
import ColorPicker from './components/ColorPicker/ColorPicker.Component';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MyNotes from './components/MyNotes/MyNotes.Component';
import * as ROUTES from './constants/routes';

const  textArea = React.createRef()


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldNavigate: false }
  }

  getColor = (val) => {
    textArea.current.style.backgroundColor = `rgb(${val})`
    textArea.current.children[0].style.backgroundColor = `rgb(${val})`
  }

  render() {
    return(
    <React.Fragment>
      <Router>
        <SidebarMenu></SidebarMenu>
        <ColorPicker color={this.getColor}></ColorPicker>
        <Route exact path={ROUTES.LANDING} component={Home} />
      <Route path={ROUTES.MY_NOTES} component={MyNotes} />

      </Router>
    </React.Fragment>
    )
  }
}

function Home() {
  return(
  <div className="text-area" ref={ textArea }>
    <Welcome></Welcome>
  </div>
  );
}


export default App;
