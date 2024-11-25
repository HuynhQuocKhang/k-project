import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../utils/toast-function';
import { jwtDecode } from 'jwt-decode';
import App from '../App';
import SuccessPage from './error-pages/success-page';
import { Navigate } from 'react-router-dom';
import ManageAccount from './ManageAccount/ManageAccount';
import { CustomJwtPayload } from '../utils/cookies-function';
function ManageAccountPage() {
    const { authToken } = useAuth();
    const checkJwt = (token: any) => {
        if (!token) {
            return false;
        }

        try {
            const decoded = jwtDecode<CustomJwtPayload>(token);
            console.log("decoded", decoded)
            const currentTime = Date.now(); // Current time in seconds
            if (decoded?.exp != undefined && decoded.exp * 1000 < currentTime) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    };

    const isAuthenticated = checkJwt(authToken);
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return (
        <ManageAccount />
    );
}

export default ManageAccountPage;
