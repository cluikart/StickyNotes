import React from "react";
import posed from "react-pose";
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";

import NoteData from "./noteData";
import colorIcon from "../images/color-wheel.png";
import {BlockPicker} from "react-color";
import { async } from "q";
import { color } from "style-value-types";

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

const OpacityBox = posed.div({
    visible: {
        opacity: 1,
        y: 0,
    },
    hidden: {
        opacity: 0,
        y: 20,
    }
});

const OpacityBox2 = posed.div({
    visible: {
        opacity: 1,
        y: 0,
    },
    hidden: {
        opacity: 0,
        y: 20,
    }
});

class StickyNote extends React.Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
        this.noteRef = React.createRef();
        this.interval = null;
        this.newListItem = this.newListItem.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChangeOnData = this.handleChangeOnData.bind(this);
        this.setPicker = this.setPicker.bind(this);
        this.checkPosChange = this.checkPosChange.bind(this);
        this.state = {
            html: "<p>" + this.props.title +"</p>" ,
            x: this.props.x,
            y: this.props.y,
            color: '#'+this.props.color,
            id: this.props.note_id,
            title: this.props.title,
            text: this.props.text.replace(/%0D%0B/g, "<div>"),
            listData: [],
            isOpen: false,
            isColor: false,
            updateNeeded: false,

        }
    }

    componentDidMount() {
        // console.log("posx: "+ this.state.x + " posy: " + this.state.y);
        // console.log(this.state.color + " " + this.state.title);
        this.setState({isOpen: true});

        this.interval = setInterval(() => {
            this.checkPosChange();

            if(this.state.updateNeeded){
                console.log("Updating");
                const pos = this.getElemCoord(this.noteRef.current);
                this.setState({x: pos.x, y: pos.y});
                this.setState({updateNeeded: false});
                this.updatePosition(this.noteRef.current).then(res => {
                    this.setState({updateNeeded: false});
                })
            }
          }, 5000);
    }

    componentWillUnmount() {
        this.updatePosition(this.noteRef.current).then(res => {
            console.log(res);
        });
        clearInterval(this.interval);
    }

    handleChange = evt => {
        this.setState({html: evt.target.value, title: evt.target.value.slice(3, -4)})
        this.setState({updateNeeded: true});
        // console.log(this.state.title);
        
    }

    handleChangeOnData(evt){
        this.setState({text: evt.target.value})
        this.setState({updateNeeded: true});
        // console.log(this.state.text);
        
    }

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
        this.setState({updateNeeded: true});
      };

     setPicker() {
         console.log("setting picker");
        this.setState({isColor: !this.state.isColor});
     } 

    newListItem() {
        let listData = this.state.listData;
        listData.push(<NoteData/>);
        this.setState({listData: listData});
        // console.log(this.state.listData);
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log("Enter Pressed");
          this.newListItem();
        }
      }

      setStyle() {

      }

      checkPosChange() {
          const pos = this.getElemCoord(this.noteRef.current);
          if(Math.abs(this.state.x - pos.x) > 1 &&  Math.abs(this.state.y - pos.y) > 1){
            this.setState({updateNeeded: true});
          }
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
            + Math.floor(pos.y) + "/"
            + this.state.color.replace('#', '') + "/"
            + this.state.title + "/"
            + this.state.text.replace(/<\/div>/g, "%0D%0B");
        let res = url.replace(/<div>/g, "%0D%0A");
        console.log(url);
        let encoded = encodeURI(url);
        const response = await fetch(encoded);
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

        const isOpen = this.state.isOpen;
        const isColor = this.state.isColor;
        return(
            <div>
                
            <OpacityBox  pose={isOpen ? 'visible' : 'hidden'}>
            <Box className="stickyNote" style={{backgroundColor : this.state.color}}
                pose={"shift"} 
                dx={this.state.x} 
                dy={this.state.y}
                poseKey={[this.state.x, this.state.y]}
                ref={this.noteRef}>
                <div className="stickyNote-title">
                
                <img src={colorIcon} className="stickyNote-colorIcon" onClick={this.setPicker}/>    
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
                    <NoteData text={this.props.text.replace(/%0D%0B/g, "<div>")} onChange={this.handleChangeOnData}/>
                    {this.state.listData}
                </ul>
                <OpacityBox  initialPose={'hidden'} pose={isColor ? 'hidden' : 'visible'} >
                <BlockPicker 
                    color={ this.state.color }
                    onChangeComplete={ this.handleChangeComplete }
                    className="stickyNote-picker"
                />
                </OpacityBox>  
            </Box>  
            </OpacityBox>
            </div>
        );
    }
}

export default StickyNote;