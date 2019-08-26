import React from "react";
import { throwStatement } from "@babel/types";
import { Redirect} from "react-router-dom";
import { async } from "q";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.setRedirect = this.setRedirect.bind(this);
        this.state = {
            username: '',
            password: "",
            redirect: false,
    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
      }

      setRedirect() {
          this.setState({redirect: !this.state.redirect});
      }

      renderRedirect = () => {
          if(this.state.redirect){
              return <Redirect to='/'/>
          }
      }
    
      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(name + value);

        this.setState({
        [name]: value
        });
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        const result = this.login();
        console.log(result);
        if(result === null){

        } else {
            this.props.login();
        }
        event.preventDefault();
      }

      login = async () => {
          const response = await fetch('/login/' + this.state.username + '/' + this.state.password);
          const body = await response.json();

          if(response.status !== 200) {
            throw Error(body.message)
          }
          return body;
      }

    render() {
        return(
            <div className="login">
                <a href="#" className="close" onClick={this.props.toggle}></a>
                <h2 className="login-title">Login</h2>
                <div className="login-name">
                    <h3 className="login-text">Username</h3>
                    <input className="login-input" 
                    name="username"
                    value={this.state.username} 
                    onChange={this.handleChange}/>
                </div>
                <div className="login-pass">
                    <h3 className="login-text">Password</h3>
                    <input className="login-input"
                    name="password"
                    value={this.state.password} 
                    onChange={this.handleChange}/>
                </div>
                <button className="login-signIn" onClick={this.handleSubmit}>Sign In</button>
            </div>    
        );
    }
}

export default Login;