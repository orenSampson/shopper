import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getChartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_data_chart`);

    return response.data;
  } catch (error) {
    alert("error fetching Chart data");
  }
};
