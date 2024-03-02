import axios from "axios";

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      "https://13.211.142.147/api/fetch/user"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const fetchInventory = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export default {
  fetchUsers,
  fetchInventory,
};
