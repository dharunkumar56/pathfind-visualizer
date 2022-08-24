import React from "react";

function getNeighbors(node, grid, rows, cols){
    var x = node.x;
    var y = node.y;
    var result = [];
    if(x - 1 >= 0 && !grid[x-1][y].isWall){
        result.push(grid[x-1][y]);
    }
    if(x + 1 < rows  && !grid[x+1][y].isWall){
        result.push(grid[x+1][y]);
    }
    if(y - 1 >= 0  && !grid[x][y - 1].isWall){
        result.push(grid[x][y-1]);
    }
    if(y + 1 < cols  && !grid[x][y + 1].isWall){
        result.push(grid[x][y+1]);
    }

    return result;
}

function visitedContains(node, visited){
    for(let i = 0; i < visited.length; i++){
        var currentNode = visited[i];
        if(currentNode.x === node.x && currentNode.y === node.y)
            return true;
    }
    return false;
}

function BFSVisited(grid, startNode, endNode, rows, cols){
    var queue = [];
    var path = [];
    var visited = [];
    startNode.previous = null;
    queue.push(startNode);
    visited.push(startNode);
    while(queue.length > 0){
        var currentNode = queue[0];
        if(currentNode === endNode){
            var temp = currentNode;
            while(temp.previous){
                path.push(temp);
                temp = temp.previous;
            }
            path.push(temp);
            break;

        }
        var neighbors = getNeighbors(currentNode, grid, rows, cols);
        for(let i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!visitedContains(neighbor, visited)){
                neighbor.previous = currentNode;
                queue.push(neighbor);
                visited.push(neighbor);
            }
        }
        queue.shift();
    }
    return visited;

}

export default BFSVisited;