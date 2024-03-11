import { ChangeEventHandler, useContext } from "react";
import {
  FiltersContext,
  FiltersContextType,
  Filters as FiltersType,
} from "../FiltersProvider";
import { FiltersOperator } from "./FiltersOperator";
import { useLocation, useNavigate } from "react-router-dom";

function Filters() {
  const { filters, setFilters } = useContext(
    FiltersContext,
  ) as FiltersContextType;
  const navigate = useNavigate();
  const location = useLocation();

  const { population, operator } = filters;

  function serializeFiltersOnUrl(filters: FiltersType) {
    navigate(
      `${location.pathname}/?operator=${filters.operator}&population=${filters.population}`,
    );
  }

  const onChangeOperator: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setFilters({
      operator: event.target.value as FiltersOperator,
      population: filters.population,
    });
    serializeFiltersOnUrl({
      operator: event.target.value as FiltersOperator,
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
      population: Number(event.target.value),
    });
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    event.target.select();
  };

  return (
    <>
      <select onChange={onChangeOperator} value={operator}>
        <option value={FiltersOperator.GT}>{FiltersOperator.GT}</option>
        <option value={FiltersOperator.LT}>{FiltersOperator.LT}</option>
      </select>
      <input
        type="number"
        // defaultValue={population}
        value={population}
        onChange={onChangePopulation}
        onFocus={handleFocus}
      />
    </>
  );
}

export default Filters;
