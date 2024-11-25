import Cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  permissions: string[];
  roles: string[];
}

export const saveToken = (token: any) => {
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  
  if (decodedToken) {
    Cookies.set('jwtToken', token, { expires: decodedToken.exp ? new Date(decodedToken.exp * 1000) : 1 });
  }
  else {
    Cookies.set('jwtToken', token, { expires: 1 });
  }
};

export const getPermissions = (token: any) => {
  if (token) {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken.permissions; // Assuming your token contains a 'permissions' field
  }
  return null;
};

export const getRoles = (token: any) => {
  if (token) {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken.roles; // Assuming your token contains a 'permissions' field
  }
  return null;
};