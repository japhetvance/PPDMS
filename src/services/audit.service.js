import axios from "axios";

const baseUrl = "https://13.211.142.147/api";

const postAudit = async (action, type, token) => {
  const body = {
    action,
    type,
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${baseUrl}/save/audit`, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Registering user trace failed:", error.message);
    throw error;
  }
  //   console.log("body: ", body);
  //   console.log("headers: ", headers);
};

const fetchAudit = async () => {
  try {
    const response = await axios.get(`${baseUrl}/get/audit`);
    return response.data.getAudits;
  } catch (error) {
    console.error("Fetching failed:", error.message);
    throw error;
  }
};

export default {
  postAudit,
  fetchAudit,
};
