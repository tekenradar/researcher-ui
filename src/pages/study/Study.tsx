import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/study/NavigationMenu";
import "../../stylesheets/css/pages/study/Study.css";
const Study: React.FC = () => {
  return (
    <div className="d-flex flex-row h-100 align-items-stretch ">
      <NavigationMenu />
      <div className="flex-grow-1 bg-homePageBgColor">
        <Outlet />
      </div>
    </div>
  );
};

export default Study;
