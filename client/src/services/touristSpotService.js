import { API_URL } from "./api";
import axios from "axios";


export async function getTouristSpot(keywords = "") {
  return await axios.get(`${API_URL}/trips?keywords=${keywords}`);
}
