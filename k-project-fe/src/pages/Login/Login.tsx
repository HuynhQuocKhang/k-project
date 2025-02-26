import './Login.scss';
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
import { axiosPOST } from '../../services/axios-services';
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    let [txtUsername, setTxtUsername] = useState('');
    let [txtPassword, setTxtPassword] = useState('');
    let [txtEmail, setTxtEmail] = useState('');

    const cookies = new Cookies();
    window.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    })

    const ValidateLogin = () => {
        if (txtUsername == "" || txtUsername == null) {
            showToast("warning", "Please fill user name");
            return false;
        }
        if (txtPassword == "" || txtPassword == null) {
            showToast("warning", "Please fill password");
            return false;
        }
        return true;
    }
    const handleLogin = async () => {
        try {
            if (!ValidateLogin()) return;
            setIsLoading(true);
            var loginRequest = {
                username: txtUsername,
                password: txtPassword
            };
            var rs = await axiosPOST("Auth/Login", loginRequest);
            if (rs.success) {
                const token = rs.data;
                var jwtObj = jwtDecode(token);
                if (jwtObj != null && jwtObj?.exp != undefined) {
                    var now = new Date(jwtObj.exp * 1000);
                    var time = now.getTime();
                    var expireTime = time + 1000 * 36000;
                    now.setTime(expireTime);
                    cookies.set("jwt_authentication", token, {
                        expires: now
                    })
                }
                showToast("success", "Đăng nhập thành công")
                setTimeout(() => {
                    window.location.href = (process.env.REACT_APP_IS_DEVELOPMENT ? "http://admin.hqkhang.io.vn" : "http://localhost:3000");
                }, 2000)
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleRegister = () => {

    }

    const changeToRegisterComponent = () => {
        var coverComponent = document.getElementById("cover-component");
        var welcomeComponent = document.getElementById("welcome-component");
        var backComponent = document.getElementById("back-component");
        var welcomeContent = document.getElementById("welcome-content");
        var backContent = document.getElementById("back-content");
        var registerContent = document.getElementById("register-content");
        var loginContent = document.getElementById("login-content");

        coverComponent?.classList.add("register-slide-from-center")
        setTimeout(() => {
            welcomeContent?.classList.add("welcome-slide-left")
        }, 500)

        setTimeout(() => {
            if (backComponent)
                backComponent.style.display = "flex";
            backContent?.classList.add("back-slide-from-right")
            if (welcomeComponent)
                welcomeComponent.style.display = "none";
            if (registerContent) {
                registerContent?.classList.add("register-slide-from-right")
            }
            if (loginContent) {
                loginContent?.classList.replace("login-content", "login-content-hide")
            }

        }, 1200)
    }


    const changeToLoginComponent = () => {
        var coverComponent = document.getElementById("cover-component");
        var welcomeComponent = document.getElementById("welcome-component");
        var welcomeContent = document.getElementById("welcome-content");
        var backContent = document.getElementById("back-content");
        var loginContent = document.getElementById("login-content");
        var backComponent = document.getElementById("back-component");

        coverComponent?.classList.replace("register-slide-from-center", "login-slide-from-center")
        setTimeout(() => {
            backContent?.classList.replace("back-slide-from-right", "back-slide-from-left")
        }, 500)

        setTimeout(() => {
            if (backComponent)
                backComponent.style.display = "none";

            welcomeContent?.classList.replace("welcome-slide-left", "welcome-slide-right")
            if (welcomeComponent)
                welcomeComponent.style.display = "flex";

            if (loginContent) {
                loginContent?.classList.add("login-slide-from-left")
                loginContent?.classList.replace("login-content-hide", "login-content")
            }
        }, 1300)
        setTimeout(() => {
            clearAdditionalClass();
        }, 2000)
    }

    const clearAdditionalClass = () => {
        var coverComponent = document.getElementById("cover-component");
        var welcomeContent = document.getElementById("welcome-content");
        var backContent = document.getElementById("back-content");
        var loginContent = document.getElementById("login-content");
        var backComponent = document.getElementById("back-component");
        var registerContent = document.getElementById("register-content");

        if (coverComponent && coverComponent.classList.contains("login-slide-from-center"))
            coverComponent.classList.remove("login-slide-from-center")
        if (coverComponent && coverComponent.classList.contains("register-slide-from-center"))
            coverComponent.classList.remove("register-slide-from-center")

        if (welcomeContent && welcomeContent.classList.contains("welcome-slide-left"))
            welcomeContent.classList.remove("welcome-slide-left")
        if (welcomeContent && welcomeContent.classList.contains("welcome-slide-right"))
            welcomeContent.classList.remove("welcome-slide-right")

        if (backComponent && backComponent.classList.contains("back-slide-from-right"))
            backComponent.classList.remove("back-slide-from-right")
        if (backComponent && backComponent.classList.contains("back-slide-from-left"))
            backComponent.classList.remove("back-slide-from-left")

        if (backContent && backContent.classList.contains("back-slide-from-right"))
            backContent.classList.remove("back-slide-from-right")
        if (backContent && backContent.classList.contains("back-slide-from-left"))
            backContent.classList.remove("back-slide-from-left")

        if (registerContent && registerContent.classList.contains("register-slide-from-right"))
            registerContent.classList.remove("register-slide-from-right")

        if (loginContent && loginContent.classList.contains("login-slide-from-left"))
            loginContent.classList.remove("login-slide-from-left")
    }

    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <div className='cover-component' id="cover-component"></div>
                    <div className="welcome-component" id="welcome-component">
                        <div className="welcome-content" id="welcome-content">
                            <div className="welcome-title">Hello, Welcome!</div><br />
                            <div className="welcome-text">Don't have an account?</div>
                            <div className='mb-4 mt-4 d-flex justify-content-center align-items-center'>
                                <SimpleButton className="cover-button" onClick={() => changeToRegisterComponent()}>Register</SimpleButton>
                            </div>
                        </div>
                    </div>
                    <div className="back-component" id="back-component">
                        <div className="back-content" id="back-content">
                            <div className="back-title">Welcome Back!</div><br />
                            <div className="back-text">Already have an account?</div>
                            <div className='mb-4 mt-4 d-flex justify-content-center align-items-center'>
                                <SimpleButton className="cover-button" onClick={() => changeToLoginComponent()}>Login</SimpleButton>
                            </div>
                        </div>
                    </div>

                    <div className='register-content' id="register-content">
                        <div style={{ margin: "auto", padding: "24px 0px" }}>
                            <div className="register-title">Register</div>
                            <div className='mb-4 mt-4'>
                                <TextFieldWithIcon value={txtUsername} icon={faUser} placeholder='Username' onChange={(e: any) => setTxtUsername(e)} />
                            </div>
                            <div className='mb-4 mt-4'>
                                <TextFieldWithIcon type="email" value={txtEmail} icon={faEnvelope} placeholder='Email' onChange={(e: any) => setTxtEmail(e)} />
                            </div>
                            <div className='mb-4 mt-4'>
                                <TextFieldWithIcon type="password" value={txtPassword} icon={faLock} placeholder='Password' onChange={(e: any) => setTxtPassword(e)} />
                            </div>
                            <div className='mb-4 mt-4'>
                                <SimpleButton onClick={() => handleRegister()}>Register</SimpleButton>
                            </div>
                            <label className="label-text">or register with social platforms</label>
                            <SocialPlatform />
                        </div>
                    </div>
                    <div className='login-content' id="login-content">
                        <div style={{ margin: "auto", padding: "24px 0px" }}>
                            <div className="login-title">Login</div>
                            <div className='mb-4 mt-4'>
                                <TextFieldWithIcon value={txtUsername} icon={faUser} placeholder='Username' onChange={(e: any) => setTxtUsername(e)} />
                            </div>
                            <div className='mb-4 mt-4'>
                                <TextFieldWithIcon type="password" value={txtPassword} icon={faLock} placeholder='Password' onChange={(e: any) => setTxtPassword(e)} />
                            </div>
                            <a className="forgot-password-text">Forgot Password?</a>
                            <div className='mb-4 mt-4'>
                                <SimpleButton onClick={() => handleLogin()}>Login</SimpleButton>
                            </div>
                            <label className="label-text">or login with social platforms</label>
                            <SocialPlatform />
                        </div>
                    </div>
                </div>
            </div >
            <Loading isLoading={isLoading} />
        </>
    );
}
export default Login;
