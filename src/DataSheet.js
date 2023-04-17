import './App.css';
import ReactDataSheet from "react-datasheet";
import Spreadsheet from "react-spreadsheet";
import 'react-datasheet/lib/react-datasheet.css';
import { useEffect, useState } from 'react';
import SchemaParser from './craft/SchemaParser';
import {
  AccountSchemaSource, AccountDataSource, AccountLayout, AccountUiSchema,
  ReportSchemaSource, ReportDataSource, ReportLayout,
} from './craft/data';

import NumberField from './components/NumberField';
import Select from './components/Select';

const registerComponents = {
  "Select": Select,
}

const typeComponents = {
  "number": NumberField,
}

function transpose(grid){
  const newGrid=[];
  const rowNum=grid.length;
  const colNum=grid[0].length;
  for(let i=0;i<colNum;++i){
    const row=[];
    for(let j=0;j<rowNum;++j){
      row.push(grid[j][i])
    }
    newGrid.push(row);
  }
  return newGrid;
}

const formatGrid = (grid) => {
  return grid.map(row => row.map(cell => ({ ...cell, width: 80 })));
}

const transformer = (grid) => {
  return grid.map(row => row.map(cell => {
    if (cell.hasOwnProperty("get")) {
      let Component = null;
      // console.log(cell?.getField())
      if (cell?.getField().component) {
        // console.log(cell?.getField())
        Component = registerComponents[cell.getField().component];
      } else {
        Component = typeComponents[cell.getField().type];
      }
      return {
        ...cell,
        component:
          <Component
            get={cell.get}
            getField={cell.getField}
            set={cell.set}
            register={cell.register}
            unRegister={cell.unRegister}
          />,
        width: 35
      }
    } else {
      return {
        ...cell,
        width: 50
      }
    }

  }));
}

function DataSheet() {
  const [parser, setParser] = useState(null);
  const [layout, setLayout] = useState(null);
  const [grid, setGrid] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ row: 0, col: 0 });

  const [anoGrid, setAnoGrid] = useState([
    [{ value: 1, width: 100 }, {
      value: 3, component:
        <NumberField
          get={() => { }}
          set={() => { console.log("update") }}
          register={() => { console.log("register") }}
          unRegister={() => { console.log("unregister") }}
        />
    }],
    [{ value: 2 }, { value: 4 }],
  ]);

  useEffect(() => {
    const p = new SchemaParser(ReportSchemaSource, ReportDataSource);
    p.parseProxy(p.root, p.root.rootData);
    p.parseCallbacks(p.root, p.root.rootData);
    p.distrubuteCallback(p.root, p.root.rootData);
    p.parseUiSchema(p.root, p.root.rootData);
    setParser(p);
    setLayout(ReportLayout);
  }, [])
  useEffect(() => {
    if (parser && layout) {
      setGrid(transpose(transformer(parser.genArrayFromTemplate(parser.root,
        parser.root.rootData, layout))));
    }
  }, [parser, layout])

  return (
    <div
      style={{ position: 'relative', width: "10000px" }}
      onClick={(event) => {
        setCursorPos({ x: event.clientX, y: event.clientY })
      }}
      // onMouseMove={(event) => {
      //   setCursorPos({
      //     x: event.clientX,
      //     y: event.clientY
      //   })
      // }}
    >
      {/* <div>x: {cursorPos.x}, y: {cursorPos.y}</div> */}

      <ReactDataSheet
        data={grid}
        onSelect={(context) => {
          const { start, end } = context;
          if (start.i === end.i && start.j === end.j) {
            setCurrentPos({ row: start.i, col: start.j });
          }
        }}
        valueRenderer={cell => cell?.get?.() || cell.value}
      // onCellsChanged={changes => {
      //   const newGrid = grid.map(row => [...row]);
      //   changes.forEach(({ cell, row, col, value }) => {
      //     if (newGrid[row][col].hasOwnProperty("get")) {
      //       newGrid[row][col].value=cell.get();
      //     } else {
      //       newGrid[row][col] = { ...newGrid[row][col], value };
      //     }
      //   });
      //   // parser.updateArray(newGrid);
      //   // setGrid(newGrid);
      // }}
      />

      {/* <ReactDataSheet
        data={anoGrid}
        valueRenderer={cell => cell.value}
        onCellsChanged={changes => {
          console.log(changes);
          const grid = anoGrid.map(row => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            grid[row][col] = { ...grid[row][col], value };
          });
          setAnoGrid(grid);
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
          setGrid(transpose(transformer(parser.genArrayFromTemplate(parser.root,
            parser.root.rootData, layout))))
        }}>insertPrev</button>
        <button onClick={() => {
          const { row, col } = currentPos;
          grid[row][col]?.insertPost();
          setGrid(transpose(transformer(parser.genArrayFromTemplate(parser.root,
            parser.root.rootData, layout))))
        }}>insertPost</button>
        <button onClick={() => {
          const { row, col } = currentPos;
          // console.log(grid[row][col])
          grid[row][col]?.delete();
          setGrid(transpose(transformer(parser.genArrayFromTemplate(parser.root,
            parser.root.rootData, layout))))
        }}>delete</button>
      </div>
    </div>



  );
}

export default DataSheet;
