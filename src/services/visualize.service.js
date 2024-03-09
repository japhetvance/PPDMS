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
const dailySalesVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/daily/sales/visual`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const weeklySalesVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/weekly/sales/visual`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};
const monthlySalesVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/monthly/sales/visual`);
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
  dailySalesVisualize,
  weeklySalesVisualize,
  monthlySalesVisualize,
};
