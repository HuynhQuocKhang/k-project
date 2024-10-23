import './Login.scss';
import LoginImage from '../assets/images/signup-image.jpg';
import { TextField } from '@mui/material';
import TextFieldWithIcon from '../controls/TextField/TextFieldWithIcon';
import { faCheck, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import ButtonWithIcon from '../controls/Button/ButtonWithIcon';
import Loading from '../controls/Loading/Loading';
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    let txtUsername = useRef('');
    let txtPassword = useRef('');
    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }
    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <div className='row' style={{ height: '100%' }}>
                        <div className='col-12 col-sm-12 col-md-6 login-content'>
                            <div className="login-title">Login</div>
                            <div className='align-center'>
                                <TextFieldWithIcon value={txtUsername.current} icon={faUser} placeholder='Username' />
                            </div>
                            <div className='align-center'>
                                <TextFieldWithIcon value={txtPassword.current} icon={faKey} placeholder='Password' />
                            </div>
                            <div className='align-center'>
                                <ButtonWithIcon onClick={handleLogin} icon={faCheck}>Login</ButtonWithIcon>
                            </div>
                        </div>
                        <div className='col-12 col-sm-12 col-md-6 login-image'>
                            <img src={LoginImage}></img>
                        </div>
                    </div>
                </div>
            </div>
            <Loading isLoading={isLoading} />
        </>
    );
}
export default Login;
