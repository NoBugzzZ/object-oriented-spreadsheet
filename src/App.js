import './App.css';
import ReactDataSheet from "react-datasheet";
import 'react-datasheet/lib/react-datasheet.css';
import { parser, parseData, toSpreadSheet } from './utils/parser';
import { Income } from './utils/data';
import { useEffect, useState } from 'react';

function App() {
  const [grid, setGrid] = useState([]);
  const [data,setData]=useState(null);
  const [currentPos,setCurrentPos]=useState({row:-1,col:-1});
  useEffect(() => {
    console.log(Income)
    const schema = parser(Income);
    const data = parseData(schema);
    const spreadsheet = toSpreadSheet(data)
    console.log(schema);
    console.log(data);
    console.log(spreadsheet)
    setData(data);
    setGrid(spreadsheet)
  }, [])
  // useEffect(()=>{
  //   setGrid([
  //     [{ value: 1 }, { value: 3 }],
  //     [{ value: 2 }, { value: 4 }],
  //   ])
  // },[])
  return (
    <div className="App">
      <ReactDataSheet
        data={grid}
        onSelect={({start,end})=>{
          if(start.i===end.i&&start.j===end.j){
            setCurrentPos({row:start.i,col:start.j});
          }
        }}
        onContextMenu={(event, cell, i, j)=>{
          console.log(cell,i,j);
        }}
        valueRenderer={cell => cell.value}
        onCellsChanged={changes => {
          changes.forEach(({ cell, row, col, value }) => {
            grid[row][col].update(+value);
          });
          setGrid(toSpreadSheet(data))
          // const grid = this.state.grid.map(row => [...row]);
          // changes.forEach(({ cell, row, col, value }) => {
          //   grid[row][col] = { ...grid[row][col], value };
          // });
          // this.setState({ grid });
        }}
      />
      <button onClick={()=>{
        const {row,col}=currentPos;
        grid[row][col]?.insert();
        setGrid(toSpreadSheet(data))
      }}>add</button>
    </div>
  );
}

export default App;
