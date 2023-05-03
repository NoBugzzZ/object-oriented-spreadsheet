import './App.css';
import ReactDataSheet from "react-datasheet";
import Spreadsheet, { DataViewer } from "react-spreadsheet";
import { CellBase, DataEditorComponent, DataViewerComponent } from 'react-spreadsheet';
import 'react-datasheet/lib/react-datasheet.css';
import { useEffect, useState } from 'react';
import SchemaParser from './craft/SchemaParser';
import {
  AccountSchemaSource, AccountDataSource, AccountLayout, AccountUiSchema,
  ReportSchemaSource, ReportDataSource, ReportLayout,
} from './craft/data';

import NumberField from './components/NumberField';
import Select from './components/Select';
import CellViewer from './components/CellViewer';
import StringField from './components/StringField';

const registerComponents = {
  "Select": Select,
}

const typeComponents = {
  "number": NumberField,
  "string": StringField,
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
      // console.log(cell)
      return {
        ...cell,
        DataViewer: () => (
          <CellViewer
            get={cell.get}
            register={cell.register}
            unRegister={cell.unRegister}
          />
        ),
        DataEditor: () => (
          <Component
            get={cell.get}
            getField={cell.getField}
            set={cell.set}
            register={cell.register}
            unRegister={cell.unRegister}
          />),
        width: 80
      }
    } else {
      return {
        ...cell,
        width: 80
      }
    }

  }));
}

function MySpreadSheet() {
  const [parser, setParser] = useState(null);
  const [layout, setLayout] = useState(null);
  const [grid, setGrid] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ row: 0, col: 0 });

  const [data, setData] = useState([
    [{ value: 1 }, { value: 2 },{ value: "=A1+2" }],
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "=A3" }],
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
      setGrid(transformer(parser.genArrayFromTemplate(parser.root,
        parser.root.rootData, layout)));
    }
  }, [parser, layout])

console.log(grid)
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

      <Spreadsheet
        data={grid}
        onSelect={(selected) => {
          // console.log(selected);
          if (selected.length === 1) {
            const { row, column: col } = selected[0];
            setCurrentPos({ row, col });
          }
        }}
      />

<Spreadsheet data={data} onChange={setData} />;
<button onClick={()=>{
  const newData=data.map(row=>[...row]);
  newData.splice(0,0,[{value:"1"},{value:"2"}]);
  setData(newData)
}}>click</button>
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
          setGrid(transformer(parser.genArrayFromTemplate(parser.root,
            parser.root.rootData, layout)))
        }}>insertPrev</button>
        <button onClick={() => {
          const { row, col } = currentPos;
          grid[row][col]?.insertPost();
          setGrid(transformer(parser.genArrayFromTemplate(parser.root,
            parser.root.rootData, layout)));
        }}>insertPost</button>
        <button onClick={() => {
          const { row, col } = currentPos;
          // console.log(grid[row][col])
          grid[row][col]?.delete();
          setGrid(transformer(parser.genArrayFromTemplate(parser.root,
            parser.root.rootData, layout)));
        }}>delete</button>
      </div>
    </div>



  );
}

export default MySpreadSheet;
