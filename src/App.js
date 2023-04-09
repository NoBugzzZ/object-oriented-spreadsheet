import './App.css';
import ReactDataSheet from "react-datasheet";
import Spreadsheet from "react-spreadsheet";
import 'react-datasheet/lib/react-datasheet.css';
import { useEffect, useState } from 'react';
import SchemaParser from './craft/SchemaParser';
import {
  AccountSchemaSource, AccountDataSource, AccountLayout,
  ReportSchemaSource, ReportDataSource, ReportLayout,
} from './craft/data';

const formatGrid = (grid) => {
  return grid.map(row => row.map(cell => ({ ...cell, width: 80 })));
}

function App() {
  const [parser, setParser] = useState(null);
  const [layout, setLayout] = useState(null);
  const [grid, setGrid] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ row: 0, col: 0 });

  useEffect(() => {
    const p = new SchemaParser(AccountSchemaSource, AccountDataSource);
    p.parseProxy(p.root, p.root.rootData);
    p.parseCallbacks(p.root, p.root.rootData);
    p.distrubuteCallback(p.root, p.root.rootData);
    setParser(p);
    setLayout(AccountLayout);
  }, [])
  useEffect(() => {
    if (parser && layout) {
      setGrid(formatGrid(parser.genArrayFromTemplate(parser.root,
        parser.root.rootData, layout)));
    }
  }, [parser, layout])

  return (
    <div
      style={{ position: 'relative', width: "10000px" }}
      onClick={(event) => {
        setCursorPos({ x: event.clientX, y: event.clientY })
      }}
    >
      {/* <ReactDataSheet
        data={grid}
        onSelect={(context) => {
          const { start, end } = context;
          if (start.i === end.i && start.j === end.j) {
            setCurrentPos({ row: start.i, col: start.j });
          }
        }}
        valueRenderer={cell => cell.value}
        onCellsChanged={changes => {
          const newGrid = grid.map(row => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            if (newGrid[row][col].hasOwnProperty("set")) {
              newGrid[row][col].set(value);
            } else {
              newGrid[row][col] = { ...newGrid[row][col], value };
            }
          });
          parser.updateArray(newGrid);
          setGrid(newGrid);
        }}
      /> */}
      <Spreadsheet data={grid}
        onChange={(data) => {
          console.log(data)
        }}
        onSelect={({row,col})=>{
          setCurrentPos({ row, col});
        }}
      />;

      {/* <ReactDataSheet
    data={[
			[{ value: 1 ,width:100}, { value: 3 ,width:100}],
			[{ value: 2 }, { value: 4 }],
		]}
    valueRenderer={cell => cell.value}
        onCellsChanged={changes => {
          const grid = this.state.grid.map(row => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            grid[row][col] = { ...grid[row][col], value };
          });
          this.setState({ grid });
        }}
  /> */}

      <div
        style={{
          width: '100px',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          position: "absolute",
          left: `${cursorPos.x + 50}px`,
          top: `${cursorPos.y}px`,
          visibility: grid?.[currentPos.row]?.[currentPos.col]?.hasOwnProperty("delete") ? "visible" : "hidden",
        }}
      >
        <button onClick={() => {
          const { row, col } = currentPos;
          grid[row][col]?.insertPrev();
          setGrid(formatGrid(parser.genArrayFromTemplate(parser.root,
            parser.root.rootData, layout)))
        }}>insertPrev</button>
        <button onClick={() => {
          const { row, col } = currentPos;
          grid[row][col]?.insertPost();
          setGrid(formatGrid(parser.genArrayFromTemplate(parser.root,
            parser.root.rootData, layout)));
        }}>insertPost</button>
        <button onClick={() => {
          const { row, col } = currentPos;
          // console.log(grid[row][col])
          grid[row][col]?.delete();
          setGrid(formatGrid(parser.genArrayFromTemplate(parser.root,
            parser.root.rootData, layout)));
        }}>delete</button>
      </div>
    </div>



  );
}

export default App;
