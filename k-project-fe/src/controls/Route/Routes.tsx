import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import SuccessPage from '../../pages/error-pages/success-page';
import NotFoundPage from '../../pages/error-pages/not-found-page';
import NavigateBar from '../Navigate/NavigateBar';
function RoutesComponent() {
  return (
      <Routes>
        <Route path="/" element={<NavigateBar />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="not-found" element={<NotFoundPage />} />
        </Route>
      </Routes>
  );
}

export default RoutesComponent;
