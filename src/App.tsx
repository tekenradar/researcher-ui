import React from 'react';
import { Outlet } from 'react-router-dom';
import Appbar from './components/Appbar';


const App: React.FC = () => {
  return (
    <div className='d-flex flex-column vh-100'>
      <Appbar />
      <Outlet />
    </div>
  );
};

export default App;
