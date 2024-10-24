import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page';
import Navigate from './controls/Navigate/Navigate';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
