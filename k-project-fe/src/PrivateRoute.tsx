
import { Route } from 'react-router-dom';
import LoginPage from './pages/login-page';

const PrivateRoute = (props: any) => {

    return (
        props.hasAccess ?
            <Route
                path={props.path}
                element={props.element}
            /> :
            <Route path="login" element={<LoginPage />} />
    );
};

export default PrivateRoute;
