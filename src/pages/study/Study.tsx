import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/study/NavigationMenu";
import "../../stylesheets/css/pages/study/Study.css";
const Study: React.FC = () => {
  return (
    <div className="row gx-0 h-100">
      <div className="col-1 ">
        <NavigationMenu />
      </div>
      <div className="col-11  bg-homePageBgColor">
        <Outlet />
      </div>
    </div>
  );
};

export default Study;
