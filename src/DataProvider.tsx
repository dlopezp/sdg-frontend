import { ReactNode, createContext } from "react";
import { RegionData } from "./repository";

export type DataContextType = {
  data: RegionData[];
};

interface Props {
  children?: ReactNode;
  data: RegionData[];
}

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children, data }: Props) {
  return (
    <DataContext.Provider
      value={{
        data: data.sort((r1, r2) => r2.population - r1.population),
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
