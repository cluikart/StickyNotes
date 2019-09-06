import React from "react";
import {slide as Menu} from 'react-burger-menu';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Home from "./home";
import Boards from "./boards";
import BoardMenu from "./boardMenu";
import { async } from "q";

class MenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.saveBoardsState = this.saveBoardsState.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.state = {
            boardsState: null,
        }
    }

    saveBoardsState(state) {
        console.log("The State passed up: " + JSON.stringify(state.myBoards[0]));
        this.setState({boardsState: state});
        if(this.state.boardsState !== null){
            // console.log('My boards: ' + JSON.stringify(this.state.boardsState.myBoards[0]));
        }
    }

    // componentWillUnmount() {
    //     let i;
    //     const myBoards = this.state.boardsState.myBoards;
    //     for(i = 0; i < myBoards.length; i++) {
    //         // this.updateBoard(myBoards[i]).then(res => {
    //         //     console.log('update of boards complete');
    //         // });
    //     }
    // }

    updateBoard = async(board) => {
        const response = await fetch(process.env.REACT_APP_API_URL+'/boardMenu/update/' + board.board_id + '/' + 
        board.name + '/' + board.color);
        const body = await response.json();

        console.log(body);

        if(response.status !== 200){
           throw Error(body.message);
        }

        return body;
    }

    render() {
        return(
            <div>
                <HashRouter>
                    <Menu>
                        {/* <NavLink className="menu-item" to="/">
                            Home
                        </NavLink> */}
                        {/* onPointerUp={blueComp} */}
                        <NavLink className="menu-item" to="/" >
                            Boards
                        </NavLink>
                        <div className="menu-item" onClick={() => this.props.toggleLogin()}>
                            Logout
                        </div>
                        {/* <NavLink className="menu-item" to="/boardMenu" >
                            BoardsMenu
                        </NavLink> */}
                    </Menu>
                    <div className="content">
                    {/* <Route exact path="/" component={Home}/> */}
                    <Route exact path="/" 
                    render={(props) => <Boards {...props} user_id={this.props.user_id} saveState={this.saveBoardsState} state={this.state.boardsState}/>}/>
                    <Route path="/boardMenu" component={BoardMenu}/>
                    </div>
                </HashRouter>
            </div>    
        );
    }
}

export default MenuBar;