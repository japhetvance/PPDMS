import axios from "axios";

const baseUrl = "https://13.211.142.147/api";

const eggReportApproved = async (id, approval, token) => {
  const body = {
    id,
    approval,
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${baseUrl}/eggreport/approved`, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Updating approved egg report failed:", error.message);
    throw error;
  }
};

const flocksReportApproved = async (id, approval, token) => {
  const body = {
    id,
    approval,
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(
      `${baseUrl}/flocksreport/approved`,
      body,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Updating approved flocks report failed:", error.message);
    throw error;
  }
};

const salesReportApproved = async (id, approval, token) => {
  const body = {
    id,
    approval,
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${baseUrl}/egg/sales/approved`, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Updating approved sales report failed:", error.message);
    throw error;
  }
};

const fetchReportEgg = async () => {
  try {
    const response = await axios.get(`${baseUrl}/fetch/egg/approval`);
    return response.data;
  } catch (error) {
    console.error("Fetching egg report failed:", error.message);
    throw error;
  }
};

const fetchReportFlock = async () => {
  try {
    const response = await axios.get(`${baseUrl}/fetch/flocks/approval`);
    return response.data;
  } catch (error) {
    console.error("Fetching flocks report failed:", error.message);
    throw error;
  }
};

const fetchReportSales = async () => {
  try {
    const response = await axios.get(`${baseUrl}/fetch/sales/approval`);
    return response.data;
  } catch (error) {
    console.error("Fetching sales report failed:", error.message);
    throw error;
  }
};

export default {
  eggReportApproved,
  flocksReportApproved,
  salesReportApproved,
  fetchReportEgg,
  fetchReportFlock,
  fetchReportSales,
};
