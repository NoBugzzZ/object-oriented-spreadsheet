import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DataSheet from './DataSheet';
import MySpreadSheet from './SpreadSheet';
import Test from './Test';
import reportWebVitals from './reportWebVitals';
import { Profiler } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <DataSheet /> */}
    {/* <Profiler id="MySpreadSheet" onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) => {
      // Aggregate or log render timings...
      console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
    }}>
      <MySpreadSheet />
    </Profiler> */}

    <Profiler id="Test" onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) => {
      // Aggregate or log render timings...
      console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
    }}>
      <Test/>
    </Profiler>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
