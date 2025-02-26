import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login';
import { showToast } from '../utils/toast-function';
import { jwtDecode } from 'jwt-decode';
import App from '../App';
import SuccessPage from './error-pages/success-page';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function LoginPage() {
    const { authToken } = useAuth();
    const checkJwt = (token: any) => {
        if (!token) {
            return false;  // Token doesn't exist
        }

        try {
            const decoded = jwtDecode(token);
            // Optional: Check if the token has expired
            const currentTime = Date.now(); // Current time in seconds
            if (decoded?.exp != undefined && decoded.exp * 1000 < currentTime) {
                return false;  // Token has expired
            }

            return true;  // Return decoded token if it's valid
        } catch (error) {
            return false;  // Return false if the token is invalid
        }
    };

    const isAuthenticated = checkJwt(authToken);
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return (
        <Navigate to="/success" />
    );
}

export default LoginPage;
