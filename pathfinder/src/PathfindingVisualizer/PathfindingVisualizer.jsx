import React from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithm/dijkstras';
const START_NODE_ROW = 13;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 7;
const FINISH_NODE_COL = 45;
class PathfindingVisualizer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            grid:[],
        };
    }
    componentDidMount()
    {
        const grid = [];
        for (let row = 0; row < 20; row++)
        {
            const currentRow = [];
            for (let col = 0; col < 50; col++) 
            {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        this.setState({grid});
    }
    shortestPathVisualize(visitedaNodes)
    {
        
      const node=visitedaNodes[visitedaNodes.length-1];
      const shortestPath=getNodesInShortestPathOrder(node);
        for(let j=1;j<shortestPath.length-1;j++)
        {
          const sn=shortestPath[j];
          setTimeout(()=>{
            document.getElementById(`node-${sn.row}-${sn.col}`).className='node short-path';

          },10*j+1);
          
        }
        
    
    }
    animateDijkstra(visitedaNodes)
    {
        
        for(let i=1;i<=visitedaNodes.length-2;i++)
        {
          
          const node=visitedaNodes[i];
          setTimeout(() => {
            document.getElementById(`node-${node.row}-${node.col}`).className ='node is-visited';
          }, 10 *i);
        
        }
        
    }
    

    visualizeDijkstra()
    {
        const {grid}=this.state;
        const startNode=grid[START_NODE_ROW][START_NODE_COL];
        const endNode=grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedaNodes=dijkstra(grid,startNode,endNode);
        console.log(visitedaNodes);
        this.animateDijkstra(visitedaNodes);
        setTimeout(()=>{
          this.shortestPathVisualize(visitedaNodes);
        },visitedaNodes.length*10);
        
    }
    render() 
    {
        const {grid} = this.state;
    
        return (
          <div>
            <button onClick={() => this.visualizeDijkstra()}>
              Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
              {grid.map((row, rowIdx) => {
                return (
                  <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall,isVisited} = node;
                      return (
                        <Node
                          key={nodeIdx}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          isVisited={isVisited}
                        //   mouseIsPressed={mouseIsPressed}
                        //   onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        //   onMouseEnter={(row, col) =>
                        //     this.handleMouseEnter(row, col)
                        //   }
                        //   onMouseUp={() => this.handleMouseUp()}
                          row={row}>

                          </Node>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
}
const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
  


export default  PathfindingVisualizer;