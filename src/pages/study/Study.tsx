import { Spinner } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/study/NavigationMenu";
import { useAppContext } from "../../hooks/useAppContext";


const Study: React.FC = () => {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return <div className="d-flex align-items-center w-100 justify-content-center vh-100">
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
    </div>
  }

  return (
    <div className="d-flex flex-row flex-grow-1 overflow-hidden">
      <NavigationMenu />
      <Outlet />
    </div>
  );
};

export default Study;
