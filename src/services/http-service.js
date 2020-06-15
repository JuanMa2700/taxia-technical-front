import axios from "axios";
import { API_URL } from "../constants";
import { default as session } from "./authentication-service";

class HttpService {
  constructor() {
    session.setupAxiosInterceptors();
  }
  async get(URL) {
    const response = await axios.get(API_URL + URL);
    return response.data;
  }
  async post(URL, body) {
    const response = await axios.post(API_URL + URL, body);
    return response.data;
  }
}

export default new HttpService();
