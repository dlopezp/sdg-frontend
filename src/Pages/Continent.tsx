import repository from '../repository'
import { useLoaderData } from "react-router-dom"

export async function loader({ params }) {
  const data = await repository.getRegionData(params.continent) 
  return { data };
}

function Continent() {
  const { data } = useLoaderData();
  return <>
    {
      data.map(
        datum => <div key={datum.name}><strong>{datum.name}</strong>: {datum.population}</div>
      )
    }
  </>
}

export default Continent