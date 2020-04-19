
export function dijkstra(grid,startNode,endNode)
{
    if(startNode===endNode || !startNode || !endNode)
        return;
    startNode.distance=0;
    const visitedNodes=[];
    const nodes=[];
    for(const row of grid )
    {
        for(const cell of row)
        {
            nodes.push(cell);
        }
    }
    while(nodes.length>0)
    {
        const closestNode=minDistance(nodes,startNode);
        if(closestNode.isWall===true)
            continue;
        if(closestNode.distance=== Infinity)
            return visitedNodes;
        closestNode.isVisited=true;
        visitedNodes.push(closestNode);
        if (closestNode === endNode) 
            return visitedNodes;
        updateDistance(closestNode, grid);
    }
}
function minDistance(nodes,startNode)
{
    var min = Number.MAX_SAFE_INTEGER;
    var minNode={};
    var flag=0;
    for(const n of nodes)
    {
        if(n.distance< min) 
        {   
            min=n.distance; 
            minNode=n;
            flag=1;
        }
    }
    if(flag==0)
        return nodes[0];
    const index = nodes.indexOf(minNode);
    nodes.splice(index, 1);
    return minNode;
}
function updateDistance(closestNode, grid)
{
    const neighbors=getUnvisitedNeighbors(closestNode, grid);
    for(const node of neighbors)
    {    node.distance=closestNode.distance+1;
         node.previousNode = closestNode;
    }
    
}
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) 
        neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) 
        neighbors.push(grid[row + 1][col]);
    if (col > 0) 
        neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) 
        neighbors.push(grid[row][col + 1]);
    // if(row>0 && col>0)
    // {
    //     neighbors.push(grid[row-1][col-1]);
    // }
    // if(row<grid[0].length-1 && col<grid[0].length - 1)
    // {
    //     neighbors.push(grid[row+1][col+1]);
    // }
    // if(row>0 && col<grid[0].length - 1)
    // {
    //     neighbors.push(grid[row-1][col+1]);
    // }
    // if(row<grid[0].length - 1 && col>0)
    // {
    //     neighbors.push(grid[row+1][col-1]);
    // }
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

  export function getNodesInShortestPathOrder(endNode) 
  {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }