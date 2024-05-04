import axios from "axios";
import { API_URL } from "./api";

export const getCommandCoffeeVn = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/command-coffee-vn/findPaging`, {
        withCredentials: true,
      });
      return response.data.content;
    } catch (error) {
      throw error;
    }
  };


  
export const createCommandCoffeeVn = async (commandData) => {

    console.log("commandData:", commandData);
    try {
      const response = await axios.post(`${API_URL}/command-coffee-vn/create`, commandData, {
        withCredentials: true,
      }
        )
      return response.data;
    } catch (error) {
      throw error;
    }
  };