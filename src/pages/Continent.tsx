import { useContext } from "react";
import { FiltersContext, FiltersContextType } from "../FiltersProvider";
import { CountryData } from "../repository";
import { useLoaderData } from "react-router-dom";
import { FiltersOperator } from "../components/FiltersOperator";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Continent() {
  const data = useLoaderData() as CountryData[];
  const { filters } = useContext(FiltersContext) as FiltersContextType;

  const countryNames: string[] = [];
  const values: number[] = [];
  data
    .filter((country) =>
      filters.operator === FiltersOperator.GT
        ? country.population > filters.population
        : country.population < filters.population,
    )
    .sort((r1, r2) => r2.population - r1.population)
    .forEach((country) => {
      countryNames.push(country.name);
      values.push(country.population);
    });

  const options = {
    chart: { type: "bar", width: "600" },
    title: "Country population",
    xAxis: {
      categories: countryNames,
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
      gridLineWidth: 0,
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        borderRadius: "50%",
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Population",
        data: values,
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}

export default Continent;
