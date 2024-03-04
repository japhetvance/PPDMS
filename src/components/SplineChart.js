import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function ProductionForecastChart() {
  const [forecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://13.211.142.147/api/production/forecastings"
        );
        console.log("response: ", response.data);
        setForecastData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!forecastData) return <p>No data available</p>;

  // Prepare series data
  const series = Object.keys(forecastData).map((eggType) => {
    let data = forecastData[eggType];
    if (Array.isArray(data)) {
      // If data is an array, append the predicted value to it
      data = [...data, forecastData[`${eggType}_predicted`]];
    } else {
      // If data is a single value, create an array with just the predicted value
      data = [forecastData[`${eggType}_predicted`]];
    }
    return {
      name: eggType,
      data: data,
    };
  });

  const categories = Array.from(
    { length: series[0].data.length },
    (_, i) => "Week" + (i + 1)
  );

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    title: {
      text: "Production Forecast",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "Poppins",
        color: "white",
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      position: "top",
      labels: {
        colors: "white",
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={550}
      />
    </div>
  );
}

export default ProductionForecastChart;
