import repository, { RegionData } from '../repository'
import { Link, useLoaderData } from "react-router-dom"

export async function loader(): Promise<RegionData[]> {
    const data = await repository.getRegionsData() 
    return data;
}

function World() {
    const data = useLoaderData() as RegionData[]

    return <>
        {
            data.map(
                (region: RegionData) => <div key={region.name}>
                    <Link to={`${region.name.toLowerCase()}`}><strong>{region.name}</strong></Link>: {region.population}
                </div>
            )
        }
    </>
}

export default World