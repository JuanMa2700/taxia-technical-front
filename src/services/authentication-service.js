import axios from "axios";
import { API_URL } from "../constants";

class AuthenticationService {
  executeJwtAuthentication(email, password) {
    return axios.post(API_URL + "/authenticate", {
      email,
      password,
    });
  }
  createJWTToken(token) {
    return "Bearer " + token;
  }
  async registerSuccessfulLogin(token) {
    await sessionStorage.setItem("token", token);
    await this.setupAxiosInterceptors();
    await this.saveAuthenticatedUser();
  }
  async saveAuthenticatedUser() {
    const res = await axios.get(API_URL + "/authUser");
    sessionStorage.setItem("name", res.data.username);
    sessionStorage.setItem("id", res.data.id);
    sessionStorage.setItem("roles", res.data.roles);
    window.location = "/";
  }
  logout() {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("token");
    window.location = "/";
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("token");
    if (user === null) return false;
    return true;
  }
  async setupAxiosInterceptors() {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn) {
        const token = this.createJWTToken(sessionStorage.getItem("token"));
        config.headers.authorization = token;
        return config;
      }
    });
  }
}

export default new AuthenticationService();
