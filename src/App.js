import React from 'react';

import './App.css';
import MenuBar from "./components/menu";

import Welcome from "./components/welcome";
import { async } from 'q';

class App extends React.Component{
  constructor(props){
    super(props);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.state = {
      login: false,
      data: null,
    };
}

componentDidMount() {
  this.callBackendAPI()
  .then(res => this.setState({data: res.express}))
  .catch(err => console.log(err));
}

callBackendAPI = async () => {
  const response = await fetch('/login/cluikart/1Magnetism');
  const body = await response.json();
  console.log(body);

  if(response.status !== 200) {
    throw Error(body.message)
  }
  return body;
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
      {this.state.data}
     {menu}
    </div>
  );
  }
}

export default App;
