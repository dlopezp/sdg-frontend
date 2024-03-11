import { CountryData } from "../repository";
import { useLoaderData } from "react-router-dom";

function Continent() {
  const data = useLoaderData() as CountryData[];
  return (
    <>
      {data.map((country: CountryData) => (
        <div key={country.name}>
          <strong>{country.name}</strong>: {country.population}
        </div>
      ))}
    </>
  );
}

export default Continent;
