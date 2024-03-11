import { Link, useLocation } from "react-router-dom";
import { RegionData } from "../repository.ts";
import { useContext } from "react";
import { DataContext, DataContextType } from "../DataProvider.tsx";

function Menu() {
  const { data } = useContext(DataContext) as DataContextType;
  const location = useLocation();
  const currentRegion = location.pathname.substring(1);

  return (
    <aside className="menu">
      <p className="menu-label">Regions</p>
      <ul className="menu-list">
        {data.map((region: RegionData) => (
          <li key={region.name}>
            <Link
              to={region.name.toLowerCase()}
              className={
                currentRegion === region.name.toLowerCase() ? "is-active" : ""
              }
            >
              <p>{region.name}</p>
              <span className="is-size-7 has-text-success">
                {region.population}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Menu;
