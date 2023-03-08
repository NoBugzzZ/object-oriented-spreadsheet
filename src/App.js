import './App.css';
import ReactDataSheet from "react-datasheet";
import 'react-datasheet/lib/react-datasheet.css';
import { useEffect, useState } from 'react';
import SchemaParser from './craft/SchemaParser';
import { AccountSchemaSource, AccountDataSource, AccountLayout } from './craft/data';

const parser = new SchemaParser(AccountSchemaSource, AccountDataSource);
parser.parseProxy(parser.root, parser.root.rootData);

parser.parseCallbacks(parser.root, parser.root.rootData);
parser.distrubuteCallback(parser.root, parser.root.rootData);

function App() {
  const [grid, setGrid] = useState(
    parser.genArrayFromTemplate(parser.root,
      parser.root.rootData,
      AccountLayout));
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ row: 0, col: 0 });

  // console.log(currentPos);
  return (
    <div
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
          visibility: grid?.[currentPos.row]?.[currentPos.col]?.hasOwnProperty("delete") ? "visible" : "hidden",
        }}
      >
        <button onClick={() => {
          const { row, col } = currentPos;
          grid[row][col]?.insertPrev();
          setGrid(parser.genArrayFromTemplate(
            parser.root,
            parser.root.rootData,
            AccountLayout))
        }}>insertPrev</button>
        <button onClick={() => {
          const { row, col } = currentPos;
          grid[row][col]?.insertPost();
          setGrid(parser.genArrayFromTemplate(
            parser.root,
            parser.root.rootData,
            AccountLayout))
        }}>insertPost</button>
        <button onClick={() => {
          const { row, col } = currentPos;
          // console.log(grid[row][col])
          grid[row][col]?.delete();
          setGrid(parser.genArrayFromTemplate(
            parser.root,
            parser.root.rootData,
            AccountLayout))
        }}>delete</button>
      </div>
    </div>



  );
}

export default App;
