import React from "react";
import { throwStatement } from "@babel/types";
import { Redirect} from "react-router-dom";
import { async } from "q";
import posed from "react-pose";


const OpacityBox = posed.div({
    visible: {
        opacity: 1,
        y: 0,
        // staggerChildren: 50,
    },
    hidden: {
        opacity: 0,
        y: 20,
    }
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.setRedirect = this.setRedirect.bind(this);
        this.state = {
            username: '',
            password: "",
            uid: 1,
            redirect: false,
            wrongLogin: true,
            loginMessage: " ",
            isOpen: false,
    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
        this.renderWrongLogin = this.renderWrongLogin.bind(this);
        this.renderCorrectLogin = this.renderCorrectLogin.bind(this);
      }

      componentDidMount() {
          this.setState({isOpen: true});
      }

      setRedirect() {
          this.setState({redirect: !this.state.redirect});
      }

      renderRedirect = () => {
          if(this.state.redirect){
              return <Redirect to='/'/>
          }
      }

      validateSubmit() {
          if(this.state.username.length > 0 && this.state.password.length >= 8){
              return true;
          } else {
              return false;
          }
      }
    
      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // console.log(name + value);

        this.setState({
        [name]: value
        });
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        if(this.validateSubmit()){
            const result = this.login();
            console.log(result);
            if(result === null || result.PromiseStatus === "rejected"){
                //wrong username or password
                this.setState({wrongLogin: true, loginMessage: "Wrong Username or Password"});
            } else {
                
                result.then(user => {
                    // const user = result;
                    const uid = JSON.stringify(user.user_id);
                    console.log(typeof(user));
                    console.log("User Id is: " + uid+ " with type of " + typeof(uid));
                    // const id =  uid.json();
                    this.setState({uid: uid});
                    this.props.login(uid);
                });
            }
        } else {
            //Wrong username or password
            this.setState({wrongLogin: true, loginMessage: "Wrong Username or Password"});
        }
        event.preventDefault();
      }

      renderCorrectLogin() {
          if(this.state.uid !== null && Number.isInteger(this.state.uid)) {
            //   this.props.login(this.state.uid);
          }
      }

      renderWrongLogin = () => {
          if(this.state.wrongLogin){
              return <p className="login-error">{this.state.loginMessage}</p>
          }
      }

      login = async () => {
          const response = await fetch(process.env.REACT_APP_API_URL+'/login/' + this.state.username + '/' + this.state.password);
          const body = await response.json();

          if(response.status !== 200) {
            throw Error(body.message)
            return null;
          } else {
          return body;
          }
      }

    render() {
        const isOpen = this.state.isOpen;
        return(
            <OpacityBox pose={isOpen ? 'visible' : 'hidden'}>
            <div className="login">
                <a href="#" className="close" onClick={this.props.toggle}></a>
                <h2 className="login-title">Login</h2>
                {this.renderWrongLogin()}
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
                {this.renderCorrectLogin()}
            </div>    
            </OpacityBox>
        );
    }
}

export default Login;