import React from "react";
import Login from "./login";
import CreateAccount from "./createAccount";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleCreateAcnt = this.toggleCreateAcnt.bind(this);
        this.state = {
            login: false,
            create: false,
        }
    }

    toggleLogin() {
        this.setState({login: !this.state.login});
        console.log("setting login to" + !this.state.login);
    }

    toggleCreateAcnt() {
        this.setState({create: !this.state.create});
    }


    render() {
        let login = null;
        let create = null;
        let welcome = null;

        
        if(this.state.login) {
           
            login = (
                 <Login toggle={this.toggleLogin} login={this.props.toggleLogin}/> 
            )
        }

        if(this.state.create) {
            create = (
                 <CreateAccount toggle={this.toggleCreateAcnt} login={this.props.toggleLogin}/>
            )
        }

        if(!this.state.login && !this.state.create) {
            welcome = (
                <div className="welcome">
                <h3 className="welcome-text">Welcome</h3>
                
                <button className="welcome-login" onClick={this.toggleLogin}>Login</button>
                
                <button className="welcome-login create-account" onClick={this.toggleCreateAcnt}>Create Account</button>
                </div>
            )
        }

        return(
            <div >

                {login}
                {create}

                {welcome}
                
            </div>    
        );
    }
}

export default Welcome;