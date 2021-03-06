import React from "react";
import StickyNote from "./stickyNote";
import ReactDOM from "react-dom";
import { async } from "q";
import plusBtn from "../images/plus-button.png";


class BoardMenu extends React.Component {

    constructor(props) {
        super(props);
        this.butnRef = React.createRef();
        this.addNote = this.addNote.bind(this);
        this.newNote = this.newNote.bind(this);
        this.loadNotes = this.loadNotes.bind(this);
        this.registerNewNote = this.registerNewNote.bind(this);
        this.state = {
            notes: [],
            name: this.props.name,
        }
    }

    componentDidMount() {
        console.log("Mounting Board Menu");
        console.log("Note Board State is: " + this.props.location.state.board_id);
        const boards = this.loadNotes();
        boards.then(b => {this.createNotes(b)})
    }

    createNotes(notes) {
        let myNotes = this.state.notes;
        let note;
        
        for(let i = 0; i < notes.length; i++){
            // console.log(board.board_id);
            // console.log(boards[i])
            // let b = JSON.stringify(board);
            note = notes[i];
            if(!note.deleted){
                myNotes.push(<StickyNote 
                    title={note.title} 
                    text={note.text} 
                    x={note.x} 
                    y={note.y}
                    note_id={note.note_id}
                    color={note.color}/>);
            }
        }
        this.setState({notes: myNotes});
        // return boards;
    }

    loadNotes = async() => {
        const response = await fetch(process.env.REACT_APP_API_URL+'/noteBoard/load/' + this.props.location.state.board_id + '/' + this.props.location.state.user_id);
        const body = await response.json();

        // console.log(body);

        if(response.status !== 200){
           throw Error(body.message);
        }

        return body;
    }

    addNote() {
        let notes = this.state.notes;
        notes.push(<StickyNote/>);
        this.setState({notes: notes});
    }

    getElemCoord(ref)  {
        return ReactDOM.findDOMNode(ref)
        .getBoundingClientRect();
    };


    newNote() {
        let myNotes = this.state.notes;
        let butnPos = this.getElemCoord(this.butnRef.current);
        this.registerNewNote().then(note => {
            myNotes.push(<StickyNote 
                title={note.title} 
                text={note.text} 
                x={note.x} 
                y={note.y}
                note_id={note.note_id}
                color={note.color.replace(/#/g, '')}/>);
            this.setState({notes: myNotes});
        });
    }

    registerNewNote = async() => {
        const response = await fetch(process.env.REACT_APP_API_URL+'/noteBoard/create/' 
            + this.props.location.state.board_id + '/' 
            + this.props.location.state.user_id);
        const body = await response.json();

        // console.log(body);

        if(response.status !== 200){
           throw Error(body.message);
        }

        return body;
    }

    render() {
       
        return(
            <div className="board-menu ">
               <h2 className="board-menu-title">{this.props.location.state.name}</h2>
               <div className="board-menu-addNote-wrapper">
               <img src={plusBtn} ref={this.butnRef} onClick={this.newNote} className="board-menu-addNote"/>
               </div>
                <div className="board-menu-content">
                    {/* <StickyNote/> */}
                    {this.state.notes}
                </div>
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div> */}
            </div>    
        );
    }
}

export default BoardMenu;