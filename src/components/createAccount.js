import React from "react";

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: "",
            password2: "",
            passInequalityMessage: ""
            
    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAccount = this.createAccount.bind(this);
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
        if(this.state.password === this.state.password2){
            const result = this.createAccount();
            console.log("the create result: "+result);
            if(result === null){

            } else {
                this.props.login();
            }
        } else {
            //Do Something!!!!!
            this.setState({passInequalityMessage: "Passwords don't match"});

        }
        
        event.preventDefault();
      }

      createAccount = async () => {
          const response = await fetch('/login/createAccount/' + this.state.username + '/' + this.state.password);
          const body = await response.json();

          if(response.status !== 200) {
            throw Error(body.message)
          }
          return body;
      }
    render() {
        return(
            <div className="create">
                <a href="#" className="close" onClick={this.props.toggle}></a>
                <h2 className="create-title">Join Us</h2>
                <div className="create-name">
                    <h3 className="create-text">Username/Email</h3>
                    <input className="create-input"
                    name="username"
                    value={this.state.username} 
                    onChange={this.handleChange}/>
                </div>
                <div className="create-pass">
                    <h3 className="create-text">Password</h3>
                    <input className="create-input"
                    name="password"
                    value={this.state.password} 
                    onChange={this.handleChange}/>
                </div>
                <div className="create-pass">
                    <h3 className="create-text">Re-Enter Password</h3>
                    <input className="create-input"
                    name="password2"
                    value={this.state.password2} 
                    onChange={this.handleChange}/>
                    <p className="create-passInequity">{this.state.passInequalityMessage}</p>
                </div>
                <button className="create-signIn" onClick={this.handleSubmit}>Sign In</button>
            </div>    
        );
    }
}

export default CreateAccount;