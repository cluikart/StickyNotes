import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import {Route, NavLink, HashRouter} from "react-router-dom";
import posed from 'react-pose';

import BoardMenu from "./boardMenu";

const OpacityBox = posed.div({
    visible: {
        opacity: 1,
        y: 0,
    },
    hidden: {
        opacity: 0,
        y: 20,
    }
});

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
        this.interval = null;
        this.state = {
            html: "<p>"+ this.props.name + "</p>" ,
            board_id: this.props.board_id,
            user_id: this.props.user_id,
            name: this.props.name,
            color: this.props.color,
            isOpen: false,
            updateNeeded: false,
        }
    }

    // useEffect(() => {
    //     const interval = 
    //     return () => 
    //   }, []);
    

    handleChange = evt => {
        this.setState({html: evt.target.value, name: evt.target.value.slice(3,-4), updateNeeded: true});
        const stateCopy = this.state;
        stateCopy.html = evt.target.value;
        stateCopy.name =  evt.target.value.slice(3,-4);
        console.log('the title being passed: ' + JSON.stringify(stateCopy));
        this.props.save(stateCopy);
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        
       
        // this.saveBoard().then(res => {
        //     // console.log(res);
        // })
    }

    componentDidMount() {
       this.setState({isOpen: true});
       this.props.save(this.state);
       console.log('board name: ' + this.props.name);
        

       //Check for changes and update every 5sec
       this.interval = setInterval(() => {
        if(this.state.updateNeeded){
            console.log("Updating Changes to db");
            this.saveBoard().then(res => {
                this.setState({updateNeeded: false});
            })
        }
      }, 5000);
    

    }

    saveBoard= async () => {
        const response = await fetch(process.env.REACT_APP_API_URL+'/boardMenu/update/' + this.state.board_id 
        + '/' + this.state.name + '/'
        + this.state.color);
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
            <OpacityBox pose = {isOpen ? 'visible' : 'hidden'} className="board-wrapper"> 
                    <ContentEditable
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
              className="board-title"
            />
                        <NavLink className="menu-item" to={{
                            pathname: "/boardMenu",
                            state: {
                                name: this.props.name,
                                board_id: this.props.board_id,
                                user_id: this.state.user_id
                            }
                            
                        }}>
            <div className="board">
                
                
            </div>   
            </NavLink>

               
            </OpacityBox>  
        );
    }
}

export default Board;