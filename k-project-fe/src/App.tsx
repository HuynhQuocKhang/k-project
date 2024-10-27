import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page';
import Navigate from './controls/Navigate/Navigate';
import SuccessPage from './pages/error-pages/success-page';
import NotFoundPage from './pages/error-pages/not-found-page';
import RoutesComponent from './controls/Route/Routes';
function App() {
  return (
    <BrowserRouter>
      <RoutesComponent/>
      {/* <MessagePopup type="success" message="Hé lô" hidden={false}></MessagePopup> */}
    </BrowserRouter>
  );
}

export default App;
