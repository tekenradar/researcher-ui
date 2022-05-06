import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import StudySelector from './pages/StudySelector';
import Study from './pages/study/Study';
import DataExporter from './pages/study/DataExporter';
import ParticipantRecords from './pages/study/ParticipantRecords';
import Settings from './pages/study/Settings';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="studies">
            <Route index element={<StudySelector />} />
            <Route path=":studykey" element={<Study />}>
              <Route index element={<DataExporter />} />
              <Route path="participant-records" element={<ParticipantRecords />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          <Route index element={<Navigate replace to="studies" />} />
          <Route path="*" element={<Navigate replace to="studies" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
