import React from "react";
import {slide as Menu} from 'react-burger-menu';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Home from "./home";
import Boards from "./boards";

class MenuBar extends React.Component {
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
                    </Menu>
                    <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/boards" component={Boards}/>
                    </div>
                </HashRouter>
            </div>    
        );
    }
}

export default MenuBar;