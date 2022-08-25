import React from "react";

var visited = [];
var path = [];

function getNeighbors(node, grid, rows, cols, openSet){
    var x = node.x;
    var y = node.y;
    var result = [];
    if(y - 1 >= 0  && !grid[x][y - 1].isWall && !containsInOpenSet(grid[x][y-1], openSet)){
        result.push(grid[x][y-1]);
    }
    if(x + 1 < rows  && !grid[x+1][y].isWall && !containsInOpenSet(grid[x][y-1], openSet)){
        result.push(grid[x+1][y]);
    }
    if(y + 1 < cols  && !grid[x][y + 1].isWall && !containsInOpenSet(grid[x][y-1], openSet)){
        result.push(grid[x][y+1]);
    }
    if(x - 1 >= 0 && !grid[x-1][y].isWall && !containsInOpenSet(grid[x][y-1], openSet)){
        result.push(grid[x-1][y]);
    }
    return result;
}

function containsInOpenSet(node, visited){
    for(let i = 0; i < visited.length; i++){
        var currentNode = visited[i];
        if(currentNode.x === node.x && currentNode.y === node.y)
            return true;
    }
    return false;
}

function getDistance(startNode, endNode){
    var x1 = startNode.x;
    var y1 = startNode.y;
    var x2 = endNode.x;
    var y2 = endNode.y;

    return Math.abs(x2-x1) + Math.abs(y2-y1);
}

function getMinFrom(openSet){
    var minValue = openSet[0].f;
    var minElement = openSet[0];
    for(let i = 0; i < openSet.length; i++){
        if(openSet[i].f < minValue){
            minValue = openSet[i].f;
            minElement = openSet[i];
        }
    }

    return minElement;
}

function setInitialFromAstar(){
    visited = [];
    path = [];
}

function getPathFromAstar(){
    return path;
}

function getVisitedFromAstar(){
    return visited;
}

function Astar(startNode, endNode, grid, rows, cols){
    var openSet = [];
    var closedSet = [];
    startNode.g = 0;
    startNode.h = getDistance(startNode, endNode);
    startNode.f = startNode.g + startNode.h;

    openSet.push(startNode);

    while(openSet.length > 0){
        var currentNode = getMinFrom(openSet);
        visited.push(currentNode);
        if(currentNode === endNode){
            path.push(currentNode);
            var temp = currentNode;
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            } 
            break;
        }

        var neighbors = getNeighbors(currentNode, grid, rows, cols, openSet);
        for(let i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            var tempG = currentNode.g + 1;
            if(tempG < neighbor.g){
                neighbor.g = tempG;
                neighbor.h = getDistance(neighbor, endNode);
                neighbor.f = neighbor.g + neighbor.h;
                openSet.push(neighbor);
                neighbor.previous = currentNode;
            }
        }
        closedSet.push(currentNode);
        openSet = openSet.filter((element) => element !== currentNode);
    }

}

export default Astar;
export {setInitialFromAstar, getPathFromAstar, getVisitedFromAstar};