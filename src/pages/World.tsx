import { useContext } from "react";
import { FiltersContext, FiltersContextType } from "../FiltersProvider";
import { FiltersOperator } from "../components/FiltersOperator";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DataContext, DataContextType } from "../DataProvider";

function World() {
  const { data } = useContext(DataContext) as DataContextType;
  const { filters } = useContext(FiltersContext) as FiltersContextType;

  const regionNames: string[] = [];
  const values: number[] = [];
  data
    .filter((region) =>
      filters.operator === FiltersOperator.GT
        ? region.population > filters.population
        : region.population < filters.population,
    )
    .forEach((region) => {
      regionNames.push(region.name);
      values.push(region.population);
    });

  const options = {
    chart: { type: "bar", width: "600" },
    title: "World population by region",
    xAxis: {
      categories: regionNames,
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

export default World;
