import './Admin.scss';
import LoginImage from '../assets/images/signup-image.jpg';
import { faCheck, faEnvelope, faKey, faLock, faMailBulk, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { showToast } from '../../utils/toast-function';
import SimpleButton from '../../controls/Button/SimpleButton';
import TextFieldWithIcon from '../../controls/TextField/TextFieldWithIcon';
import SocialPlatform from '../../controls/SocialPlatform/SocialPlatform';
import Loading from '../../controls/Loading/Loading';
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    let [txtUsername, setTxtUsername] = useState('');
    let [txtPassword, setTxtPassword] = useState('');
    let [txtEmail, setTxtEmail] = useState('');
    const cookies = new Cookies();

    return (
        <>
            <div>
               <h1>Admin Page</h1>
            </div >
            <Loading isLoading={isLoading} />
        </>
    );
}
export default Login;
