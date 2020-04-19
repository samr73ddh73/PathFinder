import React from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithm/dijkstras';
let START_NODE_ROW = 7;
let START_NODE_COL = 35;
let FINISH_NODE_ROW = 7;
let FINISH_NODE_COL = 45;
//import Navbar from '../Layout/Navbar'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class PathfindingVisualizer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            grid:[],
            mouseIsPressed:false,
            mouseOnStart:false,
            mouseOnEnd:false,
            TosetStart:false,
            TosetEnd:false
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
    MoveStartNode(row,col)
    {
      
        console.log("mouse on start");
        const newGrid=this.state.grid.slice();
        const node=newGrid[row][col];
        const newNode={
        ...node,
        isStart:false,
      }
      newGrid[row][col]=newNode;
      this.setState({grid: newGrid, mouseIsPressed: true,mouseOnStart:true});
      
    }
    SetStartNode(row,col)
    {
      console.log("mouse to be set");
      const newGrid=this.state.grid.slice();
      const node=newGrid[row][col];
      const newNode={
      ...node,
      isStart:true,
      }
      START_NODE_COL=col;
      START_NODE_ROW=row;
   
      newGrid[row][col]=newNode;
      this.setState({grid: newGrid, mouseIsPressed: false,mouseOnStart:false,TosetStart:false});
    }
    MoveEndNode(row,col)
    {
      
        console.log("mouse on start");
        const newGrid=this.state.grid.slice();
        const node=newGrid[row][col];
        const newNode={
        ...node,
        isFinish:false,
      }
      newGrid[row][col]=newNode;
      this.setState({grid: newGrid, mouseIsPressed: true,mouseOnEnd:true});
      
    }
    SetEndNode(row,col)
    {
      console.log("mouse to be set");
      const newGrid=this.state.grid.slice();
      const node=newGrid[row][col];
      const newNode={
      ...node,
      isFinish:true,
      }
      FINISH_NODE_COL=col;
      FINISH_NODE_ROW=row;
   
      newGrid[row][col]=newNode;
      this.setState({grid: newGrid, mouseIsPressed: false,mouseOnEnd:false,TosetEnd:false});
    }
    handleMouseDown(row, col)
    { 
      if(row===START_NODE_ROW && col===START_NODE_COL)
          this.MoveStartNode(row,col)
     
      else if(this.state.TosetStart===true)
          this.SetStartNode(row,col);
      else if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL)
          this.MoveEndNode(row,col);
      else if(this.state.TosetEnd===true)
          this.SetEndNode(row,col);
      else{
      console.log("mouse down");
      console.log(node);
      const newGrid=this.state.grid.slice();
      const node=newGrid[row][col];
      const newNode={
        ...node,
        isWall:!node.isWall,
      }
     
      newGrid[row][col]=newNode;
      this.setState({grid: newGrid, mouseIsPressed: true});
    }
    }
    handleMouseEnter(row, col)
    {
      
      if(this.state.mouseIsPressed===false)
        return;
      if(this.state.mouseOnStart===true || this.state.TosetStart===true || this.state.mouseOnEnd===true || this.state.TosetEnd===true)
        return;
      const newGrid=this.state.grid.slice();
      const node=newGrid[row][col];
      const newNode={
        ...node,
        isWall:!node.isWall,
      }
      
      newGrid[row][col]=newNode;
      this.setState({grid: newGrid});
    }
    handleMouseUp(row,col)
    { 
      
      if(this.state.mouseOnStart===true)
      {
        console.log("yay");
        this.setState({ mouseOnStart: false, TosetStart:true,mouseIsPressed: false});
        console.log(this.state.TosetStart);
      }
      else if(this.state.mouseOnEnd===true)
      {
        console.log("yay");
        this.setState({ mouseOnEnd: false, TosetEnd:true,mouseIsPressed: false});
        //console.log(this.state.TosetStart);
      }
      else
      this.setState({mouseIsPressed: false});
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
            {/* <button onClick={() => this.visualizeDijkstra()}>
              Visualize Dijkstra's Algorithm
            </button> */}
            <div>
              <Router>
                <header>
                  <MDBNavbar color="default-color" dark expand="md">
                    <MDBNavbarBrand href="/">
                      <strong>Find Your Path</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
                      <MDBNavbarNav left>
                        <MDBNavItem>
                          <MDBNavLink to="#" onClick={() => this.visualizeDijkstra()}>
                              Visualize Dijkstra's Algorithm
                        </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                          <MDBNavLink to="#" onClick={() => this.visualizeAstar()}>A* Algo</MDBNavLink>
                        </MDBNavItem>
                      </MDBNavbarNav>
                      <MDBNavbarNav right>
                        <MDBNavItem>
                          <MDBNavLink to="#"><MDBIcon fab icon="facebook-f" /></MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                          <MDBNavLink to="#"><MDBIcon fab icon="twitter" /></MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                          <MDBNavLink to="#"><MDBIcon fab icon="instagram" /></MDBNavLink>
                        </MDBNavItem>
                      </MDBNavbarNav>
                    </MDBCollapse>
                  </MDBNavbar>
                </header>
              </Router>
            </div>
            
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
                          // mouseIsPressed={mouseIsPressed}
                          onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                          onMouseEnter={(row, col) =>this.handleMouseEnter(row, col)
                          }
                          onMouseUp={(row,col) => this.handleMouseUp(row,col)}
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