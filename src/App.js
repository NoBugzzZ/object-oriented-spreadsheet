import './App.css';
import ReactDataSheet from "react-datasheet";
import 'react-datasheet/lib/react-datasheet.css';
import { useEffect, useState } from 'react';
// import Parser from './utils/parser';
import Schemas from "./utils/data"
import Parser from './utils/parser.refactor';
import Tranform from './utils/transformer.refactor';
import AccountTransformer from './transforms/AccountTransformer';
import BudgetTransformer from './transforms/BudgetTransformer';

const { parse } = Parser
const { transform } = Tranform;
const { Income, Budget, Account } = Schemas;
function App() {
  const [grid, setGrid] = useState([]);
  const [root, setRoot] = useState(null);
  const [rootData, setRootData] = useState(null);
  const [currentPos, setCurrentPos] = useState({ row: 0, col: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [transformFunc,setTransformFunc]=useState({func:null});
  useEffect(() => {
    const [root, rootData] = parse(Budget);
    const func=transform.bind(null,BudgetTransformer.transformer,root.entry,rootData,root);
    const spreadsheet = func();
    setTransformFunc({func});
    setRoot(root);
    setRootData(rootData);
    setGrid(spreadsheet)
  }, [])
    console.log(rootData);
    console.log(grid);
  return (
    <div className="App"
      style={{ position: 'relative' }}
      onClick={(event) => {
        setCursorPos({ x: event.clientX, y: event.clientY })
      }}
    >
      <ReactDataSheet
        data={grid}
        onSelect={(context) => {
          const { start, end } = context;
          if (start.i === end.i && start.j === end.j) {
            setCurrentPos({ row: start.i, col: start.j });
          }
        }}
        onContextMenu={(event, cell, i, j) => {
          // console.log(cell, i, j);
        }}
        valueRenderer={cell => cell.value}
        onCellsChanged={changes => {
          changes.forEach(({ cell, row, col, value }) => {
            grid[row][col].update(value);
          });
          setGrid(transformFunc.func())
          // const grid = this.state.grid.map(row => [...row]);
          // changes.forEach(({ cell, row, col, value }) => {
          //   grid[row][col] = { ...grid[row][col], value };
          // });
          // this.setState({ grid });
        }}
      />
      <div
        style={{
          width: '100px',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          position: "absolute",
          left: `${cursorPos.x + 50}px`,
          top: `${cursorPos.y}px`,
          visibility: grid?.[currentPos.row]?.[currentPos.col]?.hasOwnProperty("insert") ? "visible" : "hidden",
        }}
      >
        <button onClick={() => {
          const { row, col } = currentPos;
          grid[row][col]?.insert();
          setGrid(transformFunc.func())
        }}>insert</button>
        <button onClick={() => {
          const { row, col } = currentPos;
          console.log(grid[row][col])
          grid[row][col]?.delete();
          setGrid(transformFunc.func())
        }}>delete</button>
      </div>

    </div>
  );
}

export default App;
