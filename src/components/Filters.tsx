import { ChangeEventHandler, useContext } from "react";
import { FiltersContext, FiltersContextType } from "../FiltersProvider";
import { FiltersOperator } from "./FiltersOperator";
import { useLocation, useNavigate } from "react-router-dom";

function Filters() {
  const { filters, setFilters } = useContext(
    FiltersContext,
  ) as FiltersContextType;
  const navigate = useNavigate();
  const location = useLocation();

  const { population, operator } = filters;

  const serializeFiltersOnUrl = (filters) => {
    navigate(
      `${location.pathname}/?operator=${filters.operator}&population=${filters.population}`,
    );
  };

  const onChangeOperator: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setFilters({
      operator: event.target.value as FiltersOperator,
      population: filters.population,
    });
    serializeFiltersOnUrl({
      operator: event.target.value,
      population: filters.population,
    });
  };

  const onChangePopulation: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFilters({
      operator: filters.operator,
      population: Number(event.target.value),
    });
    serializeFiltersOnUrl({
      operator: filters.operator,
      population: event.target.value,
    });
  };

  return (
    <>
      <select onChange={onChangeOperator} defaultValue={operator}>
        <option value={FiltersOperator.GT}>{FiltersOperator.GT}</option>
        <option value={FiltersOperator.LT}>{FiltersOperator.LT}</option>
      </select>
      <input
        type="number"
        // defaultValue={population}
        value={population}
        onChange={onChangePopulation}
      />
    </>
  );
}

export default Filters;
