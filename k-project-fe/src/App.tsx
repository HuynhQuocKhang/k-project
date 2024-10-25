import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page';
import Navigate from './controls/Navigate/Navigate';
import SuccessPage from './pages/error-pages/success-page';
import NotFoundPage from './pages/error-pages/not-found-page';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="not-found" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
