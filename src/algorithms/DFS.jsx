import React from "react";


var visited = [];
var path = [];
var done = false;

function getNeighbors(node, grid, rows, cols){
    var x = node.x;
    var y = node.y;
    var result = [];

    if(x - 1 >= 0 && !grid[x-1][y].isWall){
        result.push(grid[x-1][y]);
    }
    if(y + 1 < cols  && !grid[x][y + 1].isWall){
        result.push(grid[x][y+1]);
    }    
    if(x + 1 < rows  && !grid[x+1][y].isWall){
        result.push(grid[x+1][y]);
    }
    if(y - 1 >= 0  && !grid[x][y - 1].isWall){
        result.push(grid[x][y-1]);
    }

    return result;
}


function checkVisited(node){
    for(let i = 0; i < visited.length; i++){
        var currentNode = visited[i];
        if(currentNode.x === node.x && currentNode.y === node.y)
            return true;
    }
    return false;
}


function setInitial(){
    visited = [];
    path = [];
    done = false;
}

function DFS(startNode, endNode, grid, rows, cols){
    if(done)
        return;
    visited.push(startNode);
    console.log(startNode);
    if(startNode === endNode){
        console.log("Path Found");
        done = true;
        path.push(startNode);
        var temp = startNode;
        while(temp.previous){
            path.push(temp.previous);
            temp = temp.previous;
        }
        console.log("Path:");
        console.log(path);
        return;
    }
    var neighbors = getNeighbors(startNode, grid, rows, cols);
    for(let i = 0; i < neighbors.length; i++){
        var neighbor = neighbors[i];
        if(!checkVisited(neighbor)){
            neighbor.previous = startNode;
            DFS(neighbor, endNode, grid, rows, cols);
        }
    }
}

function getVisited(){
    return visited;
}

function getPath(){
    return path;
}

export default DFS;
export {getVisited, setInitial, getPath};