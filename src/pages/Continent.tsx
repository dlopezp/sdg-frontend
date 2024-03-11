import { useContext } from "react";
import { FiltersContext } from "../FiltersProvider";
import { CountryData } from "../repository";
import { useLoaderData } from "react-router-dom";
import { FiltersOperator } from "../components/FiltersOperator";

function Continent() {
  const data = useLoaderData() as CountryData[];
  const { filters } = useContext(FiltersContext) as FiltersContextType;
  return (
    <>
      {data
        .filter((country) =>
          filters.operator === FiltersOperator.GT
            ? country.population > filters.population
            : country.population < filters.population,
        )
        .map((country: CountryData) => (
          <div key={country.name}>
            <strong>{country.name}</strong>: {country.population}
          </div>
        ))}
    </>
  );
}

export default Continent;
