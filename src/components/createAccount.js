import React from "react";
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

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: "",
            password2: "",
            passInequalityMessage: "",
            isOpen: false,
            uid: null
            
    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.registerNewBoard = this.registerNewBoard.bind(this);
      }

      componentDidMount () {
          this.setState({isOpen: true});
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
        if(this.state.password.length < 8) {
            this.setState({passInequalityMessage: "Password needs to be at least 8 characters"});
        }
        else if(this.state.password === this.state.password2 ){
            const result = this.createAccount();
            result.then(res => {
                console.log("the create result: "+res);
                console.log(res[0]);
                if(!res[1]){
                    this.setState({passInequalityMessage: "This Username is taken"});
                } else {
                    const uid = JSON.stringify(res[0].user_id);
                    console.log(typeof(user));
                    console.log("User Id is: " + uid+ " with type of " + typeof(uid));
                    // const id =  uid.json();
                    this.setState({uid: uid});
                    this.registerNewBoard(uid).then(res => {
                        this.props.login(uid);
                    });
                    
                    
                }
            })
            
        } else {
            //Do Something!!!!!
            this.setState({passInequalityMessage: "Passwords don't match"});

        }
        
        event.preventDefault();
      }

      createAccount = async () => {
          const response = await fetch(process.env.REACT_APP_API_URL+'/login/createAccount/' + this.state.username + '/' + this.state.password);
          const body = await response.json();

          if(response.status !== 200) {
            throw Error(body.message)
          }
          return body;
      }

      registerNewBoard = async(uid) => {
        const response = await fetch(process.env.REACT_APP_API_URL+'/boardMenu/create/' + uid + '/' + "My Title");
        const body = await response.json();

        // console.log(body);

        if(response.status !== 200){
           throw Error(body.message);
        }

        return body;
    }


    render() {
        const isOpen = this.state.isOpen;
        return(
            <OpacityBox pose={isOpen ? 'visible' : 'hidden'}>
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
            </OpacityBox> 
        );
    }
}

export default CreateAccount;