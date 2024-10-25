import './Login.scss';
import LoginImage from '../assets/images/signup-image.jpg';
import { TextField } from '@mui/material';
import TextFieldWithIcon from '../controls/TextField/TextFieldWithIcon';
import { faCheck, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import ButtonWithIcon from '../controls/Button/ButtonWithIcon';
import Loading from '../controls/Loading/Loading';
import { axiosGET, axiosPOST } from '../services/axios-services';
import Cookies from 'js-cookie';
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    let [txtUsername, setTxtUsername] = useState('');
    let [txtPassword, setTxtPassword] = useState('');
    const handleLogin = async () => {
        // console.log(txtUsername, txtPassword);
        try {
            setIsLoading(true);
            //var rs = await axiosGET("weatherforecast");
            var loginRequest = {
                username: txtUsername,
                password: txtPassword
            };
            var rs = await axiosPOST("Auth/Login", loginRequest);
            if (rs.success) {
                const token = rs.data;
                Cookies.set('jwtToken', token, { expires: 1, secure: true }); // 'expires: 1' là 1 ngày, 'secure' cho HTTPS
                console.info(rs);
                //window.location.href = "/success";
            }
        } catch (error) {
            console.error(error);
            //window.location.href = "/not-found";
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <div className='row' style={{ height: '100%' }}>
                        <div className='col-12 col-sm-12 col-md-6 login-content'>
                            <div className="login-title">Login</div>
                            <div className='align-center'>
                                <TextFieldWithIcon value={txtUsername} icon={faUser} placeholder='Username' onChange={(e: any) => setTxtUsername(e)} />
                            </div>
                            <div className='align-center'>
                                <TextFieldWithIcon value={txtPassword} icon={faKey} placeholder='Password' onChange={(e: any) => setTxtPassword(e)}/>
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
