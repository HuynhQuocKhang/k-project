import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SuccessPage from './pages/error-pages/success-page';
import NotFoundPage from './pages/error-pages/not-found-page';
import { AuthProvider, useAuth } from './context/AuthContext';
import { showToast } from './utils/toast-function';
import { jwtDecode } from 'jwt-decode';
import Admin from './pages/Admin/Admin';
import NavigateBar from './controls/Navigate/NavigateBar';
import AdminPage from './pages/admin-page';
function App() {
  const { authToken } = useAuth();
  const checkJwt = (token: any) => {
    if (!token) {
      showToast("warning", "Please login");
      return false;  // Token doesn't exist
    }

    try {
      const decoded = jwtDecode(token);
      // Optional: Check if the token has expired
      const currentTime = Date.now(); // Current time in seconds
      if (decoded?.exp != undefined && decoded.exp * 1000 < currentTime) {
        showToast("warning", "Login session has expired");
        return false;  // Token has expired
      }

      return true;  // Return decoded token if it's valid
    } catch (error) {
      console.error("Invalid token", error);
      return false;  // Return false if the token is invalid
    }
  };

  const isAuthenticated = checkJwt(authToken);
  if (!isAuthenticated) {
    setTimeout(() => {
      window.location.href ='http://auth.hqkhang.io.vn';
    }, 3000);
    return <>Login session has expired, you will be redirect to Login Site in 3 seconds</>
  }
  return (
      <Admin />
  );
}

export default App;
