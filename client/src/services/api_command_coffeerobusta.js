import axios from "axios";
import { API_URL } from "./api";

export const getCommandCoffeeRobusta = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/command-coffee-robusta/findPaging`, {
        withCredentials: true,
      });
      return response.data.content;
    } catch (error) {
      throw error;
    }
  };


  
export const createCommandCoffeeRobusta = async (commandData) => {

    console.log("commandData:", commandData);
    try {
      const response = await axios.post(`${API_URL}/command-coffee-robusta/create`, commandData, {
        withCredentials: true,
      }
        )
      return response.data;
    } catch (error) {
      throw error;
    }
  };