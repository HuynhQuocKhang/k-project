import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from '../../pages/admin-page';
import NavigateBar from '../Navigate/NavigateBar';
function RoutesComponent() {
  return (
      <Routes>
        <Route path="/" element={<NavigateBar />}>
          <Route path="login" element={<AdminPage />} />
        </Route>
      </Routes>
  );
}

export default RoutesComponent;
