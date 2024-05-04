import axios from "axios";
import { API_URL } from "./api";

  
export const archiveGold = async (username, gold) => {

    console.log("usernameXX:", username);
    console.log("goldXX:", gold);

    try {
      const response = await axios.get(`${API_URL}/user/archivedGold?username=${username}&gold=${gold}`, 
      {
        withCredentials: true,
      }
        )
      return response.data;
    } catch (error) {
      throw error;
    }
  };