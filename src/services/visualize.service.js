import axios from "axios";

const baseUrl = "https://13.211.142.147/api";

const eggVisualize = async () => {
  try {
    const response = await axios.get(`${baseUrl}/fetch/egg/visualization`);
    return response.data;
  } catch (error) {
    console.error("Fetching egg data failed:", error.message);
    throw error;
  }
};

export default {
  eggVisualize,
};
