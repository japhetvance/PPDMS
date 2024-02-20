import axios from "axios";

const baseUrl = "http://13.211.142.147/api";

const flockDets = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/flocks/dets`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

const eggProd = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/weekly/produced`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

const eggSales = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/weekly/sold`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

export default {
  flockDets,
  eggProd,
  eggSales,
};
