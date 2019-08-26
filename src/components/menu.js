import React from "react";
import {slide as Menu} from 'react-burger-menu';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Home from "./home";
import Boards from "./boards";
import BoardMenu from "./boardMenu";

class MenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.saveBoardsState = this.saveBoardsState.bind(this);
        this.state = {
            boardsState: null,
        }
    }

    saveBoardsState(state) {
        this.setState({boardsState: state});
    }

    render() {
        return(
            <div>
                <HashRouter>
                    <Menu>
                        <NavLink className="menu-item" to="/">
                            Home
                        </NavLink>
                        {/* onPointerUp={blueComp} */}
                        <NavLink className="menu-item" to="/boards" >
                            Boards
                        </NavLink>
                        {/* <NavLink className="menu-item" to="/boardMenu" >
                            BoardsMenu
                        </NavLink> */}
                    </Menu>
                    <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/boards" 
                    render={(props) => <Boards {...props} user_id={this.props.user_id} saveState={this.saveBoardsState} state={this.state.boardsState}/>}/>
                    <Route path="/boardMenu" component={BoardMenu}/>
                    </div>
                </HashRouter>
            </div>    
        );
    }
}

export default MenuBar;