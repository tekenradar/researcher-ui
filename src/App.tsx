import React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "./components/Appbar";
import { AppContext, useAppContextValue } from "./hooks/useAppContext";

const App: React.FC = () => {
  const appContextValue = useAppContextValue();

  return (
    <div className="d-flex flex-column vh-100">
      <AppContext.Provider value={appContextValue}>
        <Appbar />
        <Outlet />
      </AppContext.Provider>
    </div>
  );
};

export default App;
