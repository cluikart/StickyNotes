import React from "react";
import ContentEditable from "react-contenteditable";
import {Route, NavLink, HashRouter} from "react-router-dom";

import BoardMenu from "./boardMenu";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
        this.state = {
            html: "<p> My Board</p>" ,
        }
    }

    handleChange = evt => {
        this.setState({html: evt.target.value})
    }

    render() {
        return(
            <div>
                    
                        <NavLink className="menu-item" to="/boardMenu">
            <div className="board">
                
                <ContentEditable
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
            />
            </div>   
            </NavLink>

               
            </div>  
        );
    }
}

export default Board;