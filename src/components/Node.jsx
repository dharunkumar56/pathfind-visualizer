import React from "react";

function Node(props){
    var newClassName;
    if(props.isStart){
        newClassName = "node start";
    }
    else if(props.isEnd){
        newClassName = "node end";
    }
    else{
        newClassName = "node";
    }

    function handleClick(){
        props.onClick(props.row, props.col);
    }

    return (
        <div id={`node-${props.row}-${props.col}`} className={newClassName} onClick={handleClick}>
            
        </div>
    )
}

export default Node;