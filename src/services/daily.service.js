import axios from "axios";

const baseUrl = "http://13.211.142.147/api";

const eggReport = async (formData, token) => {
  const { date, egg_sm_produced, egg_md_produced, egg_lg_produced, rejected } =
    formData;

  const body = {
    date,
    egg_sm_produced,
    egg_md_produced,
    egg_lg_produced,
    rejected,
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${baseUrl}/daily/egg/reports`, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Fetching egg report failed:", error.message);
    throw error;
  }
};

const flocksReport = async (formData, token) => {
  const { date, additional_flocks, deceased_flocks, sick_flocks, cal } =
    formData;

  const body = {
    date,
    additional_flocks,
    deceased_flocks,
    sick_flocks,
    cal,
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${baseUrl}/daily/flocks/reports`, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Fetching flocks report failed:", error.message);
    throw error;
  }
};

export default {
  eggReport,
  flocksReport,
};
