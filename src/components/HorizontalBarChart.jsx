import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";

import dashboardService from "services/dashboard.service";

const HorizontalBarChart = () => {
  const [data, setData] = useState({});
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dashboardService.EggProdBarGraph();
        console.log(result);

        const produced = result.map((item) => item.egg_prod);
        const sales = result.map((item) => item.egg_sales);
        const dates = result.map((item) => {
          const createdAt = new Date(item.createdAt);
          return `${createdAt.getFullYear()}-${String(
            createdAt.getMonth() + 1
          ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(2, "0")}`;
        });

        setData({ produced, sales });
        setDates(dates);
        console.log({ produced, sales });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const state = {
    series: [
      { name: "Produced", data: data.produced },
      { name: "Sold", data: data.sales },
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
        // categories: ["2024-03-01", "2024-02-29", "2024-02-28"],
        categories: dates,
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
