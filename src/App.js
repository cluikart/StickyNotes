import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from "./components/menu";

import Welcome from "./components/welcome";

class App extends React.Component{
  constructor(props){
    super(props);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.state = {
      login: false,
    };
}

  toggleLogin() {
    console.log("toggling login");
    this.setState({login: !this.state.login});
  };

  render(){
    let welcome = null;
    let menu = null;

    if(this.state.login) {
      menu = (
        <MenuBar/>
      )
    } else {
      welcome = (
        <Welcome toggleLogin={this.toggleLogin}/>
      )
    }

  return(

    <div className="App">
      {welcome}
     {menu}
    </div>
  );
  }
}

export default App;
