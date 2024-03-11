import { createBrowserRouter } from "react-router-dom";
import World from "./pages/World.tsx";
import Region from "./pages/Region.tsx";
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
          path: ":region",
          element: <Region />,
          loader: async ({ params }) => {
            const { region } = params as { region: string };
            const data = await repository.getRegionData(region);
            return data;
          },
        },
      ],
    },
  ],
  { basename: "/sdg-frontend" },
);

export default router;
