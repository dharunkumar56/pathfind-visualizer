import React, {useState, useEffect} from "react";
import Grid from "./Grid";
import BFS from "../algorithms/BFS";
import BFSVisited from "../algorithms/BFSVisited";
import DFS, {setInitial, getVisited, getPath} from "../algorithms/DFS";
import Astar, {setInitialFromAstar, getPathFromAstar , getVisitedFromAstar} from "../algorithms/Astar";
import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";

var mainGrid = [];
var rows = 30;
var cols = 70;
var done = true;
var pathFound = false;

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
            previous: null,
            g: Infinity,
            f: Infinity,
            h: Infinity
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

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function finalState(){
        if(document.getElementById(`node-${15}-${10}`).classList.contains("finished")){
            if(document.getElementById(`node-${15}-${55}`).classList.contains("finished")){
                return true;
            }
        }
        return false;
    }

    function handleClear(){
        if(finalState() || !checkProcessRunningNew()){
            console.log("hi");
            setInitialGrid();
            setGrid(mainGrid);  
            for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){   
                document.getElementById(`node-${i}-${j}`).classList.remove("wall");
                document.getElementById(`node-${i}-${j}`).classList.remove("path");
                document.getElementById(`node-${i}-${j}`).classList.remove("node-shortest-path");
                document.getElementById(`node-${i}-${j}`).classList.remove("node-visited");
                document.getElementById(`node-${i}-${j}`).classList.remove("finished");
            }
            }
            document.getElementById(`node-${15}-${10}`).classList.add("start");
            document.getElementById(`node-${15}-${55}`).classList.add("start");
        }
        else{
            alert("Wait for the visualization to complete");
            console.log("Hi");
        }
    }

    function handleBFS(){
        if(checkProcessRunning()){
            return;
        }
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
        else{
            pathFound = true;
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


    function handleDFS(){
        if(checkProcessRunning()){
            return;
        }
        var startNode = mainGrid[15][10];
        var endNode = mainGrid[15][55];
        setInitial();
        DFS(startNode, endNode, mainGrid, rows, cols);
        var visited = getVisited();
        var path = getPath();
        if(path.length === 0){
            alert("no path found");
            handleClear();
            return;
        }
        console.log("Visited:");
        console.log(visited);
        for(let i = 0; i < visited.length; i++){
            if(i === visited.length - 1){
                setTimeout(() => {
                    visualizeShortestPathDFS(path);
                }, 10 * i);        
                return;
            }
            setTimeout(() => {
                var x = visited[i].x;
                var y = visited[i].y;
                document.getElementById(`node-${x}-${y}`).classList.add("node-visited");
            }, 10 * i);        
        }
    }

    function visualizeShortestPathDFS(path){
        for(let i = 0; i < path.length; i++){
            if(i === path.length - 1){
                setTimeout(() => {
                    temp();
                }, 21 * i);           
            }
            setTimeout(() => {
                var x = path[i].x;
                var y = path[i].y;
                document.getElementById(`node-${x}-${y}`).classList.add("node-shortest-path");
            }, 20 * i);
        }  
    }
    function visualizeShortestPath(path){
        for(let i = 0; i < path.length; i++){
            if(i === path.length - 1){
                setTimeout(() => {
                    temp();
                }, 101 * i);           
            }
            setTimeout(() => {
                var x = path[i].x;
                var y = path[i].y;
                document.getElementById(`node-${x}-${y}`).classList.add("node-shortest-path");
            }, 100 * i);
        }  
    }

    function temp(){
        document.getElementById(`node-${15}-${10}`).classList = "node finished";
        document.getElementById(`node-${15}-${55}`).classList = "node finished";
    }

    function handleRandomBlocks(){
        if(checkProcessRunning()){
            return;
        }
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

    function handleAstar(){
        if(checkProcessRunning()){
            return;
        }
        var startNode = mainGrid[15][10];
        var endNode = mainGrid[15][55];
        setInitialFromAstar();
        Astar(startNode, endNode, mainGrid, rows, cols);
        var path = getPathFromAstar();
        var visited = getVisitedFromAstar();
        if(path.length === 0){
            alert("no path Found");
            handleClear();
            return;
        }
        for(let i = 0; i < visited.length; i++){
            if(i === visited.length - 1){
                setTimeout(() => {
                    visualizeShortestPath(path);
                }, 20 * i);        
                return;
            }
            setTimeout(() => {
                var x = visited[i].x;
                var y = visited[i].y;
                document.getElementById(`node-${x}-${y}`).classList.add("node-visited");
            }, 20 * i);        
        }
    }

    function handleDijkstras(){
        handleBFS();
    }

    function checkProcessRunning(){
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                if(document.getElementById(`node-${i}-${j}`).classList.contains("node-visited")){
                    alert("If a visualization is happening, wait for the execution to complete and press clear board or try to press clear board and try again");
                    return true;
                }
            }
        }
    }

    function checkProcessRunningNew(){
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                if(document.getElementById(`node-${i}-${j}`).classList.contains("node-visited")){
                    return true;
                }
            }
        }
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
                <button onClick={handleDFS} className="btn btn-primary">DFS</button>
                <button onClick={handleAstar} className="btn btn-primary">A* search</button>
                <button onClick={handleDijkstras} className="btn btn-primary">Dijkstra's</button>
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