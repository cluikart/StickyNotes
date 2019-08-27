import React from "react";
import Board from "./board";
import { async } from "q";

class Boards extends React.Component {

    constructor(props){
        super(props);
        this.newBoard = this.newBoard.bind(this);
        this.createBoards = this.createBoards.bind(this);
        this.loadBoards = this.loadBoards.bind(this);
        this.state = {
            myBoards: [],
            user_id: ""
        }
    }

    newBoard() {
        let myBoards = this.state.myBoards;
        this.registerNewBoard().then(res => {
            myBoards.push(<Board name={res.name} color={res.color} board_id={res.board_id}/>);
            this.setState({myBoards: myBoards});
        });
    }

    registerNewBoard = async() => {
        const response = await fetch('/boardMenu/create/' + this.props.user_id + '/' + "My Title");
        const body = await response.json();

        console.log(body);

        if(response.status !== 200){
           throw Error(body.message);
        }

        return body;
    }

    createBoards(boards) {
        let myBoards = this.state.myBoards;
        let board;
        
        for(let i = 0; i < boards.length; i++){
            // console.log(board.board_id);
            // console.log(boards[i])
            // let b = JSON.stringify(board);
            board = boards[i];
            myBoards.push(<Board name={board.name} board_id={board.board_id} user_id={board.user_id}/>);
        }
        this.setState({myBoards: myBoards});
        // return boards;
    }
    componentDidMount() {
        if(this.props.state === null){
            const boards = this.loadBoards();
            boards.then(b => {this.createBoards(b)})
        } else {
            this.setState(this.props.state);
        }
   
    }

    componentWillUnmount() {
        this.props.saveState(this.state);
    }

    loadBoards = async () => {
        const response = await fetch('/boardMenu/load/' + this.props.user_id);
        const body = await response.json();

        console.log(body);

        if(response.status !== 200){
           throw Error(body.message);
        }

        return body;
    }

    

    render() {
        
        return(
            <div className="boards section">
                
                <h2 className="section-title">My Boards</h2>
                <div className="boards-content">
                    {this.state.myBoards}
                    
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