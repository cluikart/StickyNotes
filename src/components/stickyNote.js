import React from "react";
import posed from "react-pose";
import ContentEditable from "react-contenteditable";

import NoteData from "./noteData";

const config = {
    draggable: true,
    dragBounds: {left: -100,},
};

const Box = posed.div(config);

class StickyNote extends React.Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
        this.newListItem = this.newListItem.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            html: "<p>" + this.props.title +"</p>" ,
            x: this.props.x,
            y: this.props.y,
            color: this.props.color,
            id: this.props.note_id,
            listData: [],

        }
    }

    handleChange = evt => {
        this.setState({html: evt.target.value})
    }

    newListItem() {
        let listData = this.state.listData;
        listData.push(<NoteData/>);
        this.setState({listData: listData});
        console.log(this.state.listData);
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log("Enter Pressed");
          this.newListItem();
        }
      }

      setStyle() {

      }

    render() {
        return(
            <Box className="stickyNote" onClick={this.setStyle}>
                <div className="stickyNote-title">
                <ContentEditable
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
              className="stickyNote-title-text"  
            />
                </div>
                <ul onKeyDown={this.handleKeyDown}>
                    <NoteData text={this.props.text}/>
                    {this.state.listData}
                </ul>
            </Box>  
        );
    }
}

export default StickyNote;