import { createBrowserRouter } from "react-router-dom";
import World from "./pages/World.tsx";
import Continent from "./pages/Continent.tsx";
import ErrorPage from "./pages/Error.tsx";
import repository from "./repository.ts";
import App from "./App.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      loader: async () => {
        const data = await repository.getRegionsData();
        return data;
      },
      children: [
        {
          path: "",
          element: <World />,
        },
        {
          path: ":continent",
          element: <Continent />,
          loader: async ({ params }) => {
            const { continent } = params as { continent: string };
            const data = await repository.getRegionData(continent);
            return data;
          },
        },
      ],
    },
  ],
  { basename: "/sdg-frontend" },
);

export default router;
