import { ChangeEventHandler, useContext } from "react";
import {
  FiltersContext,
  FiltersContextType,
  Filters as FiltersType,
} from "../FiltersProvider";
import { FiltersOperator } from "./FiltersOperator";
import { useLocation, useNavigate } from "react-router-dom";

function Filters() {
  const { filters } = useContext(FiltersContext) as FiltersContextType;
  const navigate = useNavigate();
  const location = useLocation();

  const { population, operator } = filters;

  function serializeFiltersOnUrl(filters: FiltersType) {
    navigate(
      `${location.pathname}/?operator=${filters.operator}&population=${filters.population}`,
    );
  }

  const onChangeOperator: ChangeEventHandler<HTMLSelectElement> = (event) => {
    serializeFiltersOnUrl({
      operator: event.target.value as FiltersOperator,
      population: filters.population,
    });
  };

  const onChangePopulation: ChangeEventHandler<HTMLInputElement> = (event) => {
    serializeFiltersOnUrl({
      operator: filters.operator,
      population: Number(event.target.value),
    });
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    event.target.select();
  };

  return (
    <div className="field is-horizontal">
      <div className="field-label is-align-self-center">
        <label className="label">Filters</label>
      </div>
      <div className="field-body">
        <div className="field is-flex-grow-0">
          <div className="control">
            <div className="select">
              <select
                id="filter-operator"
                onChange={onChangeOperator}
                value={operator}
              >
                <option value={FiltersOperator.GT}>{FiltersOperator.GT}</option>
                <option value={FiltersOperator.LT}>{FiltersOperator.LT}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <p className="control is-expanded"></p>
          <input
            id="filter-population"
            className="input"
            type="number"
            value={population}
            onChange={onChangePopulation}
            onFocus={handleFocus}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
