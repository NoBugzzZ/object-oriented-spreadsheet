import './App.css';
import Spreadsheet, { DataViewer } from "react-spreadsheet";
import 'react-datasheet/lib/react-datasheet.css';
import { useEffect, useState } from 'react';
import {
  ReportSchemaSource, ReportDataSource, ReportLayout,
} from './craft/data';
import { ReportGrid1 } from './craft/ReportGrid';

function Test() {
  const [data, setData] = useState(ReportGrid1);

  return (
    <>
      <Spreadsheet data={data} onChange={setData} />
      {/* <button onClick={() => {
        const newData = data.map(row => [...row]);
        newData.splice(0, 0, [{ value: "1" }, { value: "2" }]);
        setData(newData)
      }}>click</button> */}
    </>

  );
}

export default Test;
