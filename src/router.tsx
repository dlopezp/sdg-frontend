import { createBrowserRouter } from 'react-router-dom'
import World, { loader as worldLoader } from './Pages/World.tsx'
import Continent, { loader as continentLoader } from './Pages/Continent.tsx'
import ErrorPage from './Pages/Error.tsx'
import App from './App.tsx'

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
          loader: worldLoader
        },
        {
          path: ':continent',
          element: <Continent />,
          loader: continentLoader
        }
      ]
    },
  ], 
  { basename: '/sdg-frontend' }
)

export default router