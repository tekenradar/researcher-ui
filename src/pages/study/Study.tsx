import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/study/NavigationMenu";


const Study: React.FC = () => {
  return (
    <div className="d-flex flex-row flex-grow-1 overflow-hidden">
      <NavigationMenu />
      <Outlet />
    </div>
  );
};

export default Study;
