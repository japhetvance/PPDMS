import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const BarChart = () => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/production/forecastings");
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

  // Prepare data for the chart
  const categories = Array.from({ length: forecastData.egg_sm.length }, (_, i) =>
    i === forecastData.egg_sm.length - 1 ? "Predicted Value" : `Week ${i + 1}`
  );
  const series = [
    {
      name: 'Small Eggs',
      data: forecastData.egg_sm
    },
    {
      name: 'Medium Eggs',
      data: forecastData.egg_md
    },
    {
      name: 'Large Eggs',
      data: forecastData.egg_lg
    }
  ];

  // Get the predicted values
  const predictedValues = series.map(series => series.data[series.data.length - 1]);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['white']
    },
    xaxis: {
      categories: categories,
      dataLabels:{
        style:{
          color: '#ffffff' 
        }
      },
      title: {
        text: 'Weeks',
        style: {
          color: '#ffffff' 
        }
      },
      labels: {
        style: {
          colors: '#ffffff' // Set the color of x-axis labels to white
        }
      }
    },
    yaxis: {
      title: {
        text: 'Number of Eggs'
      }
    },
    legend: {
      position: 'top'
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        }
      }
    }
  };

  // Customize the tooltip to display the predicted value
  chartOptions.tooltip.custom = function({seriesIndex, dataPointIndex, w}) {
    const data = w.config.series[seriesIndex].data;
    if (dataPointIndex === data.length - 1) {
      return `<div class="tooltip">Predicted Value (${dataPointIndex}): ${data[dataPointIndex]}</div>`;
    } else {
      return `<div class="tooltip">${w.config.series[seriesIndex].name} (${dataPointIndex}): ${data[dataPointIndex]}</div>`;
    }
  };

  return (
    <div>
      <Chart options={chartOptions} series={series} type="bar" height={500} />
    </div>
  );
};

export default BarChart;
