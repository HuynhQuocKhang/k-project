import Cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  permissions: string[];
  roles: string[];
}

export const saveToken = (token: any) => {
  Cookies.set('authToken', token, { expires: 7 });
};

export const getPermissions = () => {
  const token = Cookies.get('authToken');
  if (token) {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken.permissions; // Assuming your token contains a 'permissions' field
  }
  return null;
};

export const getRoles = () => {
  const token = Cookies.get('authToken');
  if (token) {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken.roles; // Assuming your token contains a 'permissions' field
  }
  return null;
};