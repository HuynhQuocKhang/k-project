import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SuccessPage from './pages/error-pages/success-page';
import NotFoundPage from './pages/error-pages/not-found-page';
import { AuthProvider, useAuth } from './context/AuthContext';
import { showToast } from './utils/toast-function';
import { jwtDecode } from 'jwt-decode';
import Login from './pages/Login/Login';
import NavigateBar from './controls/Navigate/NavigateBar';
function App() {
    return <Login />
}

export default App;
