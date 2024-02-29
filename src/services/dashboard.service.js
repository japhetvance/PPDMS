import axios from "axios";

const baseUrl = "https://13.211.142.147/api";

const flockDets = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/flocks/dets`);
    return response.data.totalFlocksDets;
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

// Line Graph Monthly
const monthlyEggProd = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/egg/prod`);
    return response.data;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

// Sales Table
const salesTable = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/transaction`);
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
  monthlyEggProd,
  salesTable,
};
