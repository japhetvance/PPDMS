import axios from "axios";

const baseUrl = "https://13.211.142.147/api";

//EGG
const dailyEggVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/daily/egg/prod`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const weeklyEggVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/egg/prod/weekly`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const monthlyEggVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/sales/prod
    `);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

//FLOCKS
const dailyFlocksVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/flocks/visualization`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const weeklyFlocksVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/weekly/flocks/visualization`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const monthlyFlocksVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/monthly/flocks/visualization`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

//SALES
//QUANTITY
const dailySalesQuantityVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/daily/sales/visual`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const weeklySalesQuantityVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/weekly/sales/visual`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const monthlySalesQuantityVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/monthly/sales/visual`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

// PRICE
const dailySalesPriceVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/daily/pricesales/visual`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const weeklySalesPriceVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/weekly/pricesales/visual`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const monthlySalesPriceVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/monthly/pricesales/visual`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

// COMPARISON
const dailyComparisonVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/daily/comparison`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const weeklyComparisonVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/weekly/comparison`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const monthlyComparisonVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/monthly/comparison`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

export default {
  dailyEggVisualize,
  weeklyEggVisualize,
  monthlyEggVisualize,
  dailyFlocksVisualize,
  weeklyFlocksVisualize,
  monthlyFlocksVisualize,
  dailySalesQuantityVisualize,
  weeklySalesQuantityVisualize,
  monthlySalesQuantityVisualize,
  dailySalesPriceVisualize,
  weeklySalesPriceVisualize,
  monthlySalesPriceVisualize,
  dailyComparisonVisualize,
  weeklyComparisonVisualize,
  monthlyComparisonVisualize,
};
