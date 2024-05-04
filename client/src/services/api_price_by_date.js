import axios from "axios";
import { API_URL } from "./api";

export const createPriceArray = async (dateFrom, dateTo, priceDay, priceDinner) => 
{
    try 
    {

    //http://localhost:8080/api/pricetimes/insertMulti2?dateFrom=2024/05/01&dateTo=2025/05/01&priceDay=2000&priceDinner=2500
      const response = await axios.post(`${API_URL}/pricetimes/insertMulti2?dateFrom=${dateFrom}&dateTo=${dateTo}&priceDay=${priceDay} &priceDinner=${priceDinner}`,
      {
        withCredentials: true,
      },)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  export const getPriceArray = async (page, size)=>{

    try 
    {
      const response = await axios.get(`${API_URL}/pricetimes/getList?page=${page}&size=${size}`,
      {
        withCredentials: true,
      })
      return response.data.content;
    } catch (error) 
    {
      throw error;
    }
  }
  