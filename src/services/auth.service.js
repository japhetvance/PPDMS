import axios from "axios";

const baseUrl = "https://13.211.142.147/api";

const login = async (username, password) => {
  const body = {
    username,
    password,
  };

  try {
    const response = await axios.post(`${baseUrl}/login/admin`, body);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

const register = async (formData, token) => {
  const { name, email, role, username, password } = formData;

  const body = {
    name,
    email,
    role,
    username,
    password,
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${baseUrl}/register/admin`, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw error;
  }
};

const forgotPassword = async (email) => {
  const body = {
    email,
  };
  try {
    const response = await axios.post(`${baseUrl}/forgot/password`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (newPassword, token) => {
  const body = {
    newPassword,
    token,
  };
  try {
    const response = await axios.post(`${baseUrl}/reset/password`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
};
