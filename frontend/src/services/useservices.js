import httpServices, { setCommonHeader } from "./httpservices";
import jwtDeCode from "jwt-decode";
const TOKEN_KEY = "token";

setTokenHeader();

export function signUp(user) {
  return httpServices.post("/user/new", user);
}

export function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setTokenHeader() {
  setCommonHeader("x-auth-token", getJwt());
}

export async function logInUser(credentials) {
  const { data } = await httpServices.post("/auth", credentials);
  localStorage.setItem(TOKEN_KEY, data.token);
  setTokenHeader();
}

export function logOut() {
  localStorage.clear(TOKEN_KEY);
  setTokenHeader();
}

export function getUserToken() {
  try {
    const token = getJwt();
    return jwtDeCode(token);
  } catch {
    return null;
  }
}

export async function getAllUsers() {
  return await httpServices.get("/user/allUsers");
}
export async function getMyUser() {
  return await httpServices.get("/user/myUser");
}

export function getUser(id) {
  return httpServices.get(`/user/${id}`);
}

export async function getUsersInfo(users) {
  const response = await httpServices.post("/user/getUsers", users);
  return response;
}

export function setUserProfileImg(img) {
  return httpServices.put("/user/updateImg", img);
}
export function deleteUserProfileImg() {
  return httpServices.put("/user/deleteProImg");
}

export function sendContact(contact) {
  return httpServices.post("/contact/new", contact);
}

const userServices = {
  logInUser,
  logOut,
  getUserToken,
  signUp,
  getJwt,
  setUserProfileImg,
  deleteUserProfileImg,
};

export default userServices;
