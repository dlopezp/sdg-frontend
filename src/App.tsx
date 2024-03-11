import { Outlet, useLoaderData } from "react-router-dom";
import Filters from "./components/Filters";
import { FiltersProvider } from "./FiltersProvider";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { DataProvider } from "./DataProvider";
import { RegionData } from "./repository";

function App() {
  const data = useLoaderData() as RegionData[];

  return (
    <>
      <FiltersProvider>
        <DataProvider data={data}>
          <Header />
          <Main>
            <Filters />
            <Outlet />
          </Main>
          <Footer />
        </DataProvider>
      </FiltersProvider>
    </>
  );
}

export default App;
