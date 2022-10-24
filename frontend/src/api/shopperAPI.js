import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getData = async (type) => {
  try {
    let url = "";

    switch (type) {
      case "chart":
        url = `${API_URL}/get_data_chart`;
        break;
      case "table":
        url = `${API_URL}/get_data_table`;
        break;

      default:
        break;
    }

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    alert("error fetching Chart data");
  }
};
