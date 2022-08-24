import React from "react";
import Node from "./Node";

function Grid(props){

    function handleClick(row, col){
        props.onClick(row, col);
    }


    return (
        <div>
            {
                props.grid.map((rowElement, rowElementIndex) => {
                    return (
                    <div key={rowElementIndex} className="rowContainer">
                        {
                            rowElement.map((colElement, colIndex) => {
                            var {x, y, isStart, isEnd} = colElement;
                            return <Node row={x} col={y} isStart={isStart} isEnd={isEnd} onClick={handleClick}/>
                        })
                        }
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Grid;