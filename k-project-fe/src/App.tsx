import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SuccessPage from './pages/error-pages/success-page';
import NotFoundPage from './pages/error-pages/not-found-page';
import { useAuth } from './context/AuthContext';
import { showToast } from './utils/toast-function';
import { jwtDecode } from 'jwt-decode';
import Login from './pages/Login/Login';
import NavigateBar from './controls/Navigate/NavigateBar';
import LoginPage from './pages/login-page';
import ManageAccountPage from './pages/manage-account-page';

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
    return <Login />
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigateBar />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="success" element={<SuccessPage />} />
            <Route path="not-found" element={<NotFoundPage />} />
            <Route path="manage-account" element={<ManageAccountPage />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
