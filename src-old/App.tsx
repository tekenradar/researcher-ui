import React, { useEffect } from "react";

import { AppContext, useAppContextValue } from "./hooks/useAppContext";
import { AuthContext, useAuthContextValue } from "./hooks/useAuthContext";

const App: React.FC = () => {
  const appContextValue = useAppContextValue();
  const authContextValue = useAuthContextValue();


  useEffect(() => {
    /*fetch('/v1/auth/test-cookie').then(() => {
      console.log("cookie?");
    })*/
    /*fetch('/v1/auth/test-auth', { redirect: "manual", mode: 'no-cors' }).then((resp) => {
      if (resp.type === "opaqueredirect") {
        // redirect to login page
        window.location.href = resp.url;
      } else {
        // handle normally / pass on to next handler
      }
    })*/
  }, [])

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <AuthContext.Provider value={authContextValue}>
        <AppContext.Provider value={appContextValue}>
          <Outlet />
        </AppContext.Provider>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
