import React from "react";


class Login extends React.Component {
    render() {
        return(
            <div className="login">
                <a href="#" className="close" onClick={this.props.toggle}></a>
                <h2 className="login-title">Login</h2>
                <div className="login-name">
                    <h3 className="login-text">Username</h3>
                    <input className="login-input"/>
                </div>
                <div className="login-pass">
                    <h3 className="login-text">Password</h3>
                    <input className="login-input"/>
                </div>
                <button className="login-signIn" onClick={this.props.login}>Sign In</button>
            </div>    
        );
    }
}

export default Login;