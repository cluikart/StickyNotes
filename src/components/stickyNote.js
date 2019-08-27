import React from "react";
import posed from "react-pose";
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";

import NoteData from "./noteData";
import { async } from "q";

const config = {
    draggable: true,
    dragBounds: {left: -100,},
    shift: {
        x: ({dx}) => dx,
        y: ({dy}) => dy,
    },
    props: {dx: 0, dy: 20}
};

const Box = posed.div(config);

class StickyNote extends React.Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
        this.noteRef = React.createRef();
        this.newListItem = this.newListItem.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            html: "<p>" + this.props.title +"</p>" ,
            x: this.props.x,
            y: this.props.y,
            color: this.props.color,
            id: this.props.note_id,
            title: this.props.title,
            text: this.props.text,
            listData: [],

        }
    }

    componentDidMount() {
        console.log("posx: "+ this.state.x + " posy: " + this.state.y);
        console.log(this.state.color + " " + this.state.title);
    }

    componentWillUnmount() {
        this.updatePosition(this.noteRef.current).then(res => {
            console.log(res);
        });
    }

    handleChange = evt => {
        this.setState({html: evt.target.value, title: evt.target.value})
        
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

    getElemCoord(ref)  {
        return ReactDOM.findDOMNode(ref)
        .getBoundingClientRect();
    };

    updatePosition = async(ref) => {
        
        const pos = this.getElemCoord(ref);
        let url = "/noteBoard/update/" 
            + this.state.id + "/"
            + Math.floor(pos.x) + "/"
            + Math.floor(pos.y - pos.height) + "/"
            + "FFFF11" + "/"
            + this.state.title + "/"
            + this.state.text;
        console.log(url);
        const response = await fetch(url);
        const body = await response.json();

        console.log(body);

        if(response.status !== 200){
           throw Error(body.message);
        }

        return body;
        // this.setState({x: pos.x, 
        //                 y: pos.y         
        //         });
    }

    

    render() {
        return(
            <Box className="stickyNote" onClick={this.setStyle}
                pose={"shift"} 
                dx={this.state.x} 
                dy={this.state.y}
                poseKey={[this.state.x, this.state.y]}
                ref={this.noteRef}>
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