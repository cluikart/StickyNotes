import React from "react";
import Board from "./board";

class Boards extends React.Component {

    constructor(props){
        super(props);
        this.newBoard = this.newBoard.bind(this);
        this.state = {
            boards: [],
        }
    }

    newBoard() {
        let boards = this.state.boards;
        boards.push(<Board/>);
        this.setState({boards: boards});
    }

    createBoards() {
        let boards = this.state.boards;
        for(let i = 0; i < 10; i++){
            boards.push(<Board/>);
        }
        this.setState({boards: boards});
        // return boards;
    }
    componentDidMount() {
        this.createBoards();
    }

    render() {
        
        return(
            <div className="boards section">
                
                <h2 className="section-title">My Boards</h2>
                <div className="boards-content">
                    {this.state.boards}
                    
                    {/* <Board/>
                    <Board/>
                    <Board/>
                    <Board/>
                    <Board/>
                    <Board/>
                    <Board/>
                    <Board/> */}
                </div>
                <div className="boards-add-wrapper">
                    <button className="boards-add" onClick={this.newBoard}></button>
                </div>
            </div>     
        );
    }
}

export default Boards;