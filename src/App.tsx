import { Outlet } from "react-router-dom";
import Filters from "./components/Filters";
import { FiltersProvider } from "./FiltersProvider";
import "./App.css";

function App() {
  return (
    <>
      <FiltersProvider>
        <Filters />
        <Outlet />
      </FiltersProvider>
    </>
  );
}

export default App;
