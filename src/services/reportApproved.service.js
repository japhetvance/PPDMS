import axios from "axios";

const baseUrl = "http://13.211.142.147/api";

const eggReportApproved = async (id, approval) => {
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

const flocksReportApproved = async (id, approval) => {
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

export default {
  eggReportApproved,
  flocksReportApproved,
};
