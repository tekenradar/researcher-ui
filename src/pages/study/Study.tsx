import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/study/NavigationMenu";


const Study: React.FC = () => {
  return (
    <div className="d-flex flex-row h-100">
      <NavigationMenu />
      <Outlet />
    </div>
  );
};

export default Study;
