import React from "react";
import Login from "./login";
import CreateAccount from "./createAccount";
import Title from "./title";
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

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleCreateAcnt = this.toggleCreateAcnt.bind(this);
        this.state = {
            login: false,
            create: false,
            isOpen: false
        }
    }

    toggleLogin() {
        this.setState({login: !this.state.login});
        console.log("setting login to" + !this.state.login);
    }

    toggleCreateAcnt() {
        this.setState({create: !this.state.create});
    }

    componentDidMount() {
        this.setState({isOpen: true});
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
                <OpacityBox pose={this.state.isOpen ? 'visible' : 'hidden'}>
                <div className="welcome">
                <h3 className="welcome-text">StickyNotes</h3>
                {/* <Title/> */}
                
                <button className="welcome-login" onClick={this.toggleLogin}>Login</button>
                
                <button className="welcome-login create-account" onClick={this.toggleCreateAcnt}>Create Account</button>
                </div>
                </OpacityBox>
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