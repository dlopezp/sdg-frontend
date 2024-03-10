import repository from '../repository'
import { Link, useLoaderData } from "react-router-dom"

export async function loader() {
    const data = await repository.getRegionsData() 
    return { data };
}

function World() {
    const { data } = useLoaderData()

    return <>
        {
            data.map(
                datum => <div key={datum.name}>
                    <Link to={`${datum.name.toLowerCase()}`}><strong>{datum.name}</strong></Link>: {datum.population}
                </div>
            )
        }
    </>
}

export default World