import http from "./httpService";
import { apiUrl } from "../config.json";
import { jwt_decode } from "jwt-decode";
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";
export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}
export default {
  login
};
