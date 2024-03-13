import React from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";

const ReactJsBarChart = ({ data }) => {
  const state = {
    series: [
      { name: "Produced", data: data.produced },
      { name: "Sold", data: data.sold },
      { name: "Rejected", data: data.rejected },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
      stroke: {
        width: 1,
        colors: "white",
      },

      xaxis: {
        categories: data.date,
        labels: {
          formatter: function (val) {
            return val;
          },
          style: {
            colors: "#ffffff",
          },
        },
      },

      yaxis: {
        title: {
          text: undefined,
        },
        labels: {
          style: {
            colors: "#ffffff",
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
        labels: {
          colors: "#ffffff",
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={450}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ReactJsBarChart;
