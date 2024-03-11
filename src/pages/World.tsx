import { useContext } from "react";
import { RegionData } from "../repository";
import { Link, useLoaderData } from "react-router-dom";
import { FiltersContext, FiltersContextType } from "../FiltersProvider";
import { FiltersOperator } from "../components/FiltersOperator";

function World() {
  const data = useLoaderData() as RegionData[];
  const { filters } = useContext(FiltersContext) as FiltersContextType;

  return (
    <>
      {data
        .filter((continent) =>
          filters.operator === FiltersOperator.GT
            ? continent.population > filters.population
            : continent.population < filters.population,
        )
        .map((region: RegionData) => (
          <div key={region.name}>
            <Link to={`${region.name.toLowerCase()}`}>
              <strong>{region.name}</strong>
            </Link>
            : {region.population}
          </div>
        ))}
    </>
  );
}

export default World;
