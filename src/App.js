import './App.css';
import ReactDataSheet from "react-datasheet";
import 'react-datasheet/lib/react-datasheet.css';
import { useEffect, useState } from 'react';
import Parser from './utils/parser';
import Schemas from "./utils/data"

const { parser, parseData, toSpreadSheet } = Parser
const { Income,Budget } = Schemas;
function App() {
  const [grid, setGrid] = useState([]);
  const [schema, setSchema] = useState(null);
  const [data, setData] = useState(null);
  const [currentPos, setCurrentPos] = useState({ row: -1, col: -1 });
  useEffect(() => {
    console.log(Income)
    const schema = parser(Budget);
    const data = parseData(schema);
    const spreadsheet = toSpreadSheet(schema, data)
    console.log(schema);
    console.log(data);
    console.log(spreadsheet)
    setSchema(schema);
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
        onSelect={({ start, end }) => {
          if (start.i === end.i && start.j === end.j) {
            setCurrentPos({ row: start.i, col: start.j });
          }
        }}
        onContextMenu={(event, cell, i, j) => {
          console.log(cell, i, j);
        }}
        valueRenderer={cell => cell.value}
        onCellsChanged={changes => {
          changes.forEach(({ cell, row, col, value }) => {
            grid[row][col].update(value);
          });
          setGrid(toSpreadSheet(schema, data))
          // const grid = this.state.grid.map(row => [...row]);
          // changes.forEach(({ cell, row, col, value }) => {
          //   grid[row][col] = { ...grid[row][col], value };
          // });
          // this.setState({ grid });
        }}
      />
      <button onClick={() => {
        const { row, col } = currentPos;
        grid[row][col]?.insert(+grid[row][col]?.index + 1);
        setGrid(toSpreadSheet(schema, data))
      }}>add</button>
      <button onClick={() => {
        const { row, col } = currentPos;
        grid[row][col]?.delete(+grid[row][col]?.index);
        setGrid(toSpreadSheet(schema, data))
      }}>delete</button>
    </div>
  );
}

export default App;
