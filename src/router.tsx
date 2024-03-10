import { createBrowserRouter } from 'react-router-dom'
import World from './Pages/World.tsx'
import Continent from './Pages/Continent.tsx'
import ErrorPage from './Pages/Error.tsx'
import App from './App.tsx'
import repository from './repository.ts'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <World />,
          loader: async () => {
            const data = await repository.getRegionsData() 
            return data;
        }
        },
        {
          path: ':continent',
          element: <Continent />,
          loader: async ({ params }) => {
            const { continent } = params as { continent: string }
            const data = await repository.getRegionData(continent) 
            return data;
          }
        }
      ]
    },
  ], 
  { basename: '/sdg-frontend' }
)

export default router