import React from "react";
import ContentEditable from "react-contenteditable";
import {Route, NavLink, HashRouter} from "react-router-dom";

import BoardMenu from "./boardMenu";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
        this.state = {
            html: "<p>"+ this.props.name + "</p>" ,
            board_id: this.props.board_id,
            user_id: this.props.user_id,
        }
    }

    handleChange = evt => {
        this.setState({html: evt.target.value})
    }

    

    render() {
        return(
            <div>
                    <ContentEditable
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
            />
                        <NavLink className="menu-item" to={{
                            pathname: "/boardMenu",
                            state: {
                                name: "dfghjkl",
                                board_id: this.props.board_id,
                                user_id: this.state.user_id
                            }
                            
                        }}>
            <div className="board">
                
                
            </div>   
            </NavLink>

               
            </div>  
        );
    }
}

export default Board;