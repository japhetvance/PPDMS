import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

function ProductionForecastChart() {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://13.211.142.147/api/production/forecastings');
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

  // Prepare categories (x-axis labels)
  const categories = Array.from({ length: series[0].data.length }, (_, i) => i + 1);

  // Prepare options for the chart
  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    xaxis: {
      categories: categories,
    },
    title: {
      text: 'Production Forecast',
      align: 'center',
    },
    tooltip: {
      shared: false,
    },
    legend: {
      position: 'top',
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default ProductionForecastChart;
