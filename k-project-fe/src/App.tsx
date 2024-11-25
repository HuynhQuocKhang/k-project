import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page';
import Navigate from './controls/Navigate/Navigate';
import SuccessPage from './pages/error-pages/success-page';
import NotFoundPage from './pages/error-pages/not-found-page';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from './utils/cookies-function';
import PrivateRoute from './PrivateRoute';
function App() {
  const getPermissions = (requiredPermissions: string[]) => {
    const token = Cookies.get('authToken');
    let hasAccess = false;
    if (token) {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      const userPermissions = decodedToken.permissions || [];

      hasAccess = requiredPermissions.length == 0 ? true : requiredPermissions.every((permission: any) =>
        userPermissions.includes(permission)
      );
    }
    return hasAccess;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate />}>
          {getPermissions(['Admin', 'IT', 'Guest'])} && <PrivateRoute path="login" element={<LoginPage />} hasAccess={getPermissions(['Admin', 'IT', 'Guest'])} />
          {getPermissions(['Admin', 'IT', 'Guest'])} && <PrivateRoute path="success" element={<SuccessPage />} hasAccess={getPermissions(['Admin', 'IT', 'Guest'])} />
          {getPermissions(['Admin', 'IT', 'Guest'])} && <PrivateRoute path="not-found" element={<NotFoundPage />} hasAccess={getPermissions(['Admin', 'IT', 'Guest'])} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
