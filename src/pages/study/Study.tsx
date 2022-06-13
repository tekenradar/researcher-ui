import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/study/NavigationMenu";
import "../../stylesheets/css/pages/study/Study.css";
const Study: React.FC = () => {
  return (
    <div className="d-flex flex-row overflow-hidden h-100">
      <div className="">
        <NavigationMenu />
      </div>
      <div className="w-100 bg-homePageBgColor p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Study;
