import React from "react";

class CreateAccount extends React.Component {
    render() {
        return(
            <div className="create">
                <a href="#" className="close" onClick={this.props.toggle}></a>
                <h2 className="create-title">Join Us</h2>
                <div className="create-name">
                    <h3 className="create-text">Username/Email</h3>
                    <input className="create-input"/>
                </div>
                <div className="create-pass">
                    <h3 className="create-text">Password</h3>
                    <input className="create-input"/>
                </div>
                <div className="create-pass">
                    <h3 className="create-text">Re-Enter Password</h3>
                    <input className="create-input"/>
                </div>
                <button className="create-signIn" onClick={this.props.login}>Sign In</button>
            </div>    
        );
    }
}

export default CreateAccount;