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
      user_id: null,
    };
}

componentDidMount() {
  // this.callBackendAPI()
  // .then(res => this.setState({data: res.express}))
  // .catch(err => console.log(err));
}

// callBackendAPI = async () => {
//   const response = await fetch('/login/cluikart/1Magnetism');
//   const body = await response.json();
//   console.log(body);

//   if(response.status !== 200) {
//     throw Error(body.message)
//   }
//   return body;
// }



  toggleLogin(user_id)  {
    console.log("toggling login: " + user_id);
    console.log(user_id);
    
      this.setState({login: !this.state.login, user_id: user_id});
  
    
  };

  render(){
    let welcome = null;
    let menu = null;

    if(this.state.login) {
      menu = (
        <MenuBar user_id={this.state.user_id}/>
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
