import axios from "axios";
import { API_URL } from "./api";

export const getCommandCoffeeArabica = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/command-coffee-arabica/findPaging`, {
        withCredentials: true,
      });
      return response.data.content;
    } catch (error) {
      throw error;
    }
  };


  
export const createCommandCoffeeArabica = async (commandData) => {

    console.log("commandData:", commandData);
    try {
      const response = await axios.post(`${API_URL}/command-coffee-arabica/create`, commandData, {
        withCredentials: true,
      }
        )
      return response.data;
    } catch (error) {
      throw error;
    }
  };