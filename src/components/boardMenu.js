import React from "react";
import StickyNote from "./stickyNote";


class BoardMenu extends React.Component {

    constructor(props) {
        super(props)
        this.addNote = this.addNote.bind(this);
        this.state = {
            notes: [],
        }
    }

    componentDidMount() {
        console.log("Mounting Board Menu");
    }

    addNote() {
        let notes = this.state.notes;
        notes.push(<StickyNote/>);
        this.setState({notes: notes});
    }

    render() {
       
        return(
            <div className="board-menu ">
               <h2 className="section-title">Board Menu</h2>
               <button onClick={this.addNote} className="board-menu-addNote">Add Note</button>
                <div className="board-menu-content">
                    {/* <StickyNote/> */}
                    {this.state.notes}
                </div>
            </div>    
        );
    }
}

export default BoardMenu;