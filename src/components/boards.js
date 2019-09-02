import React from "react";
import Board from "./board";
import posed from "react-pose";
import { async } from "q";



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

class Boards extends React.Component {

    constructor(props){
        super(props);
        this.newBoard = this.newBoard.bind(this);
        this.createBoards = this.createBoards.bind(this);
        this.loadBoards = this.loadBoards.bind(this);
        this.updateBoards = this.updateBoards.bind(this);
        this.saveBoard = this.saveBoard.bind(this);
        this.state = {
            myBoards: [],
            user_id: "",
            isOpen: false,
            changedBoards: new Map(),
        }
    }

    newBoard() {
        let myBoards = this.state.myBoards;
        this.registerNewBoard().then(res => {
            myBoards.push(<Board name={res.name} 
                color={res.color} 
                board_id={res.board_id} 
                color={res.color}
                save={this.saveBoard}/>);
            this.setState({myBoards: myBoards});
        });
    }

    registerNewBoard = async() => {
        const response = await fetch('/boardMenu/create/' + this.props.user_id + '/' + "My Title");
        const body = await response.json();

        // console.log(body);

        if(response.status !== 200){
           throw Error(body.message);
        }

        return body;
    }

    createBoards(boards) {
        let myBoards = this.state.myBoards;
        let boardState = this.state.changedBoards;
        let board;
        
        for(let i = 0; i < boards.length; i++){
            // console.log(board.board_id);
            // console.log(boards[i])
            // let b = JSON.stringify(board);
            board = boards[i];
            // boardState.set(board.board_id, board);
            myBoards.push(<Board name={board.name} 
                board_id={board.board_id} 
                user_id={board.user_id}
                color={board.color}
                save={this.saveBoard}/>);
        }
        this.setState({myBoards: myBoards});
        // return boards;
    }

    saveBoard(boardState) {
        // console.log("the title recieved: " + JSON.stringify(boardState));
        let states = this.state.changedBoards;
        
        states.set(boardState.board_id, boardState);
        // console.log("The title mapped" + states.get(boardState.board_id));
        this.setState({changedBoards: states});
        // console.log("the states length: " + states.length + "  the boards len: " + this.state.myBoards.length)
        if(states.size === this.state.myBoards.length){this.updateBoards(states);}
        
    }

    
    // componentDidMount() {
    //     console.log('after remount' + JSON.stringify(this.state.myBoards[0]));
    // }

    componentDidMount() {
        if(this.props.state === null){
            const boards = this.loadBoards();
            boards.then(b => {this.createBoards(b)});
            this.setState({isOpen: true});
        } else {
            console.log('The State Passed Down' + JSON.stringify(this.props.state.myBoards[0]));
            this.setState(this.props.state);
            
        }

        
   
    }

    componentWillUnmount() {
        // this.updateBoards();
        // console.log('The boards before unmount' + JSON.stringify(this.state.myBoards[0].props));
        
    }

    

    loadBoards = async () => {
        const response = await fetch('/boardMenu/load/' + this.props.user_id);
        const body = await response.json();

        // console.log(body);

        if(response.status !== 200){
           throw Error(body.message);
        }

        return body;
    }

    updateBoards(newBoards) {
        let myBoards = [];
        let board;
        let state = this.state;
        
        for(let [key, value] of newBoards.entries()){
            // console.log(board.board_id);
            // console.log(boards[i])
            // let b = JSON.stringify(board);
            // console.log("Updating Board with value: " + JSON.stringify(value));
            board = value;
            // boardState.set(board.board_id, board);
            myBoards.push(<Board name={board.name} 
                board_id={board.board_id} 
                user_id={board.user_id}
                color={board.color}
                save={this.saveBoard}/>);
        }
        state.myBoards = myBoards;
        this.props.saveState(state);

        this.setState({myBoards: myBoards});




        
    }

    

    render() {
        const isOpen = this.state.isOpen;
        console.log(isOpen);
        return(
            <div className="boards section">
                <div className="section-title-wrapper">
                <h2 className="section-title">My Boards</h2>
                </div>
                <div
                // pose={isOpen ? 'visible' : 'hidden'}
                className="boards-content">
                    {this.state.myBoards}
                    
                    
                </div>
                <div className="boards-add-wrapper">
                    <button className="boards-add" onClick={this.newBoard}></button>
                </div>
            </div>     
        );
    }
}

export default Boards;