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

export default {
  dailyEggVisualize,
  weeklyEggVisualize,
  monthlyEggVisualize,
};
