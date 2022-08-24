import React, {useState, useEffect} from "react";
import Grid from "./Grid";
import BFS from "../algorithms/BFS";
import BFSVisited from "../algorithms/BFSVisited";

var mainGrid = [];
var rows = 30;
var cols = 70;


//15 25
//15 45
function App(){
    const [grid, setGrid] = useState([]);

    useEffect(handleInitialUseEffect, []);

    function handleInitialUseEffect(){
        setInitialGrid();
        setGrid(mainGrid);
    }

    function setInitialGrid(){
        for(let i = 0; i < rows; i++){
            mainGrid[i] = [];
        }
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                mainGrid[i][j] = new Spot(i, j);
                if(i === 15 && j === 10){
                    mainGrid[i][j].isStart = true;
                }
                else if(i === 15 && j === 55){
                    mainGrid[i][j].isEnd = true;
                }
            }
        }
    }

    function Spot(i, j){
        return {
            x: i,
            y: j,
            isWall: false,
            isStart: false,
            isEnd: false,
            previous: null
        }
    }

    function handleClick(row, col){
        console.log("Clicked");
        mainGrid[row][col].isWall = !mainGrid[row][col].isWall;
        console.log(mainGrid);
        if(mainGrid[row][col].isWall)
            document.getElementById(`node-${row}-${col}`).classList.add("wall");
        else    
            document.getElementById(`node-${row}-${col}`).classList.remove("wall");
        setGrid(mainGrid);
    }

    function handleClear(){
        setInitialGrid();
        setGrid(mainGrid);  
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){   
                document.getElementById(`node-${i}-${j}`).classList.remove("wall");
                document.getElementById(`node-${i}-${j}`).classList.remove("path");
                document.getElementById(`node-${i}-${j}`).classList.remove("node-shortest-path");
                document.getElementById(`node-${i}-${j}`).classList.remove("node-visited");
            }
        }
    }

    function handleBFS(){
        console.log(mainGrid);
        var startNode = mainGrid[15][10];
        var endNode = mainGrid[15][55];
        var [path] = BFS(mainGrid, startNode, endNode, rows, cols, 1);
        var [visited] = BFS(mainGrid, startNode, endNode, rows, cols, 2);
  
        if(path.length === 0){
            alert("no path Found");
            handleClear();
            return;
        }
        for(let i = 0; i < visited.length; i++){
            if(i === visited.length - 1){
                setTimeout(() => {
                    visualizeShortestPath(path);
                }, 5 * i);        
                return;
            }
            setTimeout(() => {
                var x = visited[i].x;
                var y = visited[i].y;
                document.getElementById(`node-${x}-${y}`).classList.add("node-visited");
            }, 5 * i);        
        }
        // for(let i = 0; i < path.length; i++){
        //     setTimeout(() => {
        //         var x = path[i].x;
        //         var y = path[i].y;
        //         document.getElementById(`node-${x}-${y}`).classList.add("node-shortest-path");
        //     }, 100 * i);
        // }

    }

    function visualizeShortestPath(path){
        for(let i = 0; i < path.length; i++){
            if(i === path.length - 1){
                setTimeout(() => {
                    temp();
                }, 120 * i);           
            }
            setTimeout(() => {
                var x = path[i].x;
                var y = path[i].y;
                document.getElementById(`node-${x}-${y}`).classList.add("node-shortest-path");
            }, 100 * i);
        }  
    }

    function temp(){
        document.getElementById(`node-${15}-${10}`).classList = "node start";
        document.getElementById(`node-${15}-${55}`).classList = "node start";
    }

    function handleRandomBlocks(){
        handleClear();
        for(let i = 0; i < 150; i++){
            var x = Math.floor(Math.random() * (rows - 1));
            var y = Math.floor(Math.random() * (cols - 1));
            mainGrid[x][y].isWall = true;
            setGrid(mainGrid);
            document.getElementById(`node-${x}-${y}`).classList.add("wall");
        }
    }

    function handleRefresh(){
        window.location.reload();
    }

    return (
        <div>
            <div  id="header">
                <h1 onClick={handleRefresh}>Path Finding Visualizer</h1>
            </div>
            <div className="row">
                <div className="col-lg-6">
                <button onClick={handleClear} className="btn btn-primary">Clear Board</button>
                <button onClick={handleBFS} className="btn btn-primary">BFS</button>
                <button onClick={handleRandomBlocks} className="btn btn-primary">Generate Random Blocks</button>   
                </div>
                <div className="col-lg-6">
                    <p>Step1: Clear board and Press generate random blocks or click on a node to make it a block</p>
                    <p>Step2: Select either BFS or DFS path finding algorithm</p>
                    <p>Step3: After the algorithm completes execution, press "Clear Board"</p>
                </div>
            </div>
            <div id="board">
                <Grid grid={grid} onClick={handleClick} />
            </div>
        </div>
    )
}

export default App;