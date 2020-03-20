import React from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
class PathfindingVisualizer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            nodes:[],
        };
    }
    componentDidMount()
    {
        const nodes=[];
        for(var row=0;row<15;row++)
        {
            const currow=[];
            for(var col=0;col<50;col++)
            {
                currow.push([]);
            }
            nodes.push(currow);
        }
        this.setState({nodes});
    }
    render()
    {
        const {nodes}=this.state;
        console.log(nodes);
        return(
            <div className="grid">{
                nodes.map((row,rowindx)=> {
                  return(
                    <div>{ 
                        row.map((col,colindx)=>{
                            return <Node></Node>
                        })
                    }
                    </div>
                );  
                })
            }
            </div>
        );
    }
}
export default  PathfindingVisualizer;