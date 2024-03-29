import { ReactNode, createContext, useEffect, useState } from "react";
import { FiltersOperator } from "./components/FiltersOperator";
import { useLocation, useSearchParams } from "react-router-dom";

export type Filters = {
  operator: FiltersOperator;
  population: number;
};

export type FiltersContextType = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

interface Props {
  children?: ReactNode;
}

export const FiltersContext = createContext<FiltersContextType | null>(null);

export function FiltersProvider({ children }: Props) {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const operator =
    (searchParams.get("operator") as FiltersOperator) ?? FiltersOperator.GT;
  const population = Number(searchParams.get("population")) ?? 0;

  const [filters, setFilters] = useState({
    operator,
    population,
  });

  useEffect(() => {
    const operator =
      (searchParams.get("operator") as FiltersOperator) ?? FiltersOperator.GT;
    const population = Number(searchParams.get("population")) ?? 0;

    setFilters({
      operator,
      population,
    });
  }, [location, searchParams]);

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
