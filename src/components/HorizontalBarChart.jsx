import React from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";

const HorizontalBarChart = () => {
  const state = {
    series: [
      { name: "Produced", data: [44, 55, 41, 37, 22, 43, 21] },
      { name: "Sold", data: [53, 32, 33, 52, 13, 43, 32] },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: "white",
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
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
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default HorizontalBarChart;
