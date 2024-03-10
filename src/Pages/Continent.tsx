import repository, { CountryData } from '../repository'
import { useLoaderData } from "react-router-dom"

interface Params {
  params: {
    continent: string
  }
}

export async function loader({ params }: Params): Promise<CountryData[]> {
  const data = await repository.getRegionData(params.continent) 
  return data;
}

function Continent() {
  const data = useLoaderData() as CountryData[];
  return <>
    {
      data.map(
        (country: CountryData) => <div key={country.name}><strong>{country.name}</strong>: {country.population}</div>
      )
    }
  </>
}

export default Continent