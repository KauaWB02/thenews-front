import { jwtDecode } from "jwt-decode";
import { PayloadJwtInterface } from "./interfaces/payload-jwt.interface";
import { removeObject } from "../store/storage";

export const getToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const decodeToken = (): PayloadJwtInterface | null => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<PayloadJwtInterface>(token);
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

export const hasPermission = (permission: string): boolean => {
  const decoded = decodeToken();
  return decoded ? decoded.permissionsKeys.includes(permission) : false;
};

export const isTokenExpired = (): boolean => {
  const decoded = decodeToken();
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};


export const loggout = () => {
 removeObject('access_token')
 removeObject('menus')
 removeObject('permissionKeys')
 removeObject('user')
};
