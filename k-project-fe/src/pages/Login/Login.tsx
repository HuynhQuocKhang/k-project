import './Login.scss';
import { faCheck, faEnvelope, faKey, faLock, faMailBulk, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
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
    const getAllElement = () => {
        const element = {
            coverComponent: document.getElementById("cover-component"),
            welcomeComponent: document.getElementById("welcome-component"),
            backComponent: document.getElementById("back-component"),
            welcomeContent: document.getElementById("welcome-content"),
            backContent: document.getElementById("back-content"),
            registerContent: document.getElementById("register-content"),
            loginContent: document.getElementById("login-content"),
            mobileRegisterContent: document.getElementById("mobile-register-component"),
            mobileLoginComponent: document.getElementById("mobile-login-component"),
        }
        return element;
    }
    const cookies = new Cookies();
    window.addEventListener("keypress", (event) => {
        console.log("event", event.key)
        if (event.key.toLocaleLowerCase() === "enter") {
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
            if (rs != null && rs?.success) {
                const token = rs.data;
                var jwtObj = jwtDecode(token);
                if (jwtObj != null && jwtObj?.exp != undefined) {
                    var now = new Date(jwtObj.exp * 1000);
                    var time = now.getTime();
                    var expireTime = time + 1000 * 36000;
                    now.setTime(expireTime);
                    cookies.set("jwt_authentication", token, {
                        domain: ".hqkhang.io.vn", // 👈 Make token accessible across subdomains
                        path: "/",
                        secure: true, // 👈 Required for HTTPS
                        sameSite: "lax",
                        expires: now
                    })
                }
                showToast("success", "Đăng nhập thành công")
                setTimeout(() => {
                    window.location.href = (process.env.REACT_APP_IS_DEVELOPMENT ? "http://localhost:3001" : "http://admin.hqkhang.io.vn");
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
        const element = getAllElement();
        element?.coverComponent?.classList.add("register-slide-from-center");
        setTimeout(() => {
            element?.welcomeContent?.classList.add("welcome-slide-left");
        }, 500);

        setTimeout(() => {
            if (element?.backComponent)
                element.backComponent.style.display = "flex";
            element?.backContent?.classList.add("back-slide-from-right");
            if (element?.welcomeComponent)
                element.welcomeComponent.style.display = "none";
            if (element?.registerContent) {
                element?.registerContent?.classList.add("register-slide-from-right");
            }
            if (element?.loginContent) {
                element?.loginContent?.classList.replace("login-content", "login-content-hide");
            }

        }, 1200);
    }


    const changeToLoginComponent = () => {
        const element = getAllElement();
        element?.coverComponent?.classList.replace("register-slide-from-center", "login-slide-from-center");
        setTimeout(() => {
            element?.backContent?.classList.replace("back-slide-from-right", "back-slide-from-left");
        }, 500);

        setTimeout(() => {
            if (element?.backComponent)
                element.backComponent.style.display = "none";

            element?.welcomeContent?.classList.replace("welcome-slide-left", "welcome-slide-right")
            if (element?.welcomeComponent)
                element.welcomeComponent.style.display = "flex";

            if (element?.loginContent) {
                element?.loginContent?.classList.add("login-slide-from-left");
                element?.loginContent?.classList.replace("login-content-hide", "login-content");
            }
        }, 1300);
        setTimeout(() => {
            clearAdditionalClass();
        }, 2000);
    }

    const clearAdditionalClass = () => {
        const element = getAllElement();
        if (element?.coverComponent && element?.coverComponent.classList.contains("login-slide-from-center"))
            element?.coverComponent.classList.remove("login-slide-from-center")
        if (element?.coverComponent && element?.coverComponent.classList.contains("register-slide-from-center"))
            element?.coverComponent.classList.remove("register-slide-from-center");
        if (element?.coverComponent && element?.coverComponent.classList.contains("register-slide-from-bottom-to-top"))
            element?.coverComponent.classList.remove("register-slide-from-bottom-to-top");
        if (element?.coverComponent && element?.coverComponent.classList.contains("register-slide-from-top-to-bottom"))
            element?.coverComponent.classList.remove("register-slide-from-top-to-bottom");

        if (element?.welcomeContent && element?.welcomeContent.classList.contains("welcome-slide-left"))
            element?.welcomeContent.classList.remove("welcome-slide-left");
        if (element?.welcomeContent && element?.welcomeContent.classList.contains("welcome-slide-right"))
            element?.welcomeContent.classList.remove("welcome-slide-right");

        if (element?.backComponent && element?.backComponent.classList.contains("back-slide-from-right"))
            element?.backComponent.classList.remove("back-slide-from-right");
        if (element?.backComponent && element?.backComponent.classList.contains("back-slide-from-left"))
            element?.backComponent.classList.remove("back-slide-from-left");

        if (element?.backContent && element?.backContent.classList.contains("back-slide-from-right"))
            element?.backContent.classList.remove("back-slide-from-right");
        if (element?.backContent && element?.backContent.classList.contains("back-slide-from-left"))
            element?.backContent.classList.remove("back-slide-from-left");

        if (element?.registerContent && element?.registerContent.classList.contains("register-slide-from-right"))
            element?.registerContent.classList.remove("register-slide-from-right");
        if (element?.registerContent && element?.registerContent.classList.contains("register-slide-from-bottom-to-center"))
            element?.registerContent.classList.remove("register-slide-from-bottom-to-center");


        if (element?.loginContent && element?.loginContent.classList.contains("login-slide-from-left"))
            element?.loginContent.classList.remove("login-slide-from-left");
        if (element?.loginContent && element?.loginContent.classList.contains("login-content-hide"))
            element?.loginContent.classList.remove("login-content-hide");
        if (element?.loginContent && element?.loginContent.classList.contains("login-slide-from-top-to-center"))
            element?.loginContent.classList.remove("login-slide-from-top-to-center");
        
        if (element?.mobileLoginComponent && element?.mobileLoginComponent.classList.contains("login-content-hide"))
            element?.mobileLoginComponent.classList.remove("login-content-hide");
    }


    const changeToRegisterComponentForMobile = () => {
        const element = getAllElement();
        element?.coverComponent?.classList.add("register-slide-from-bottom-to-top");
        setTimeout(() => {

            if (element?.loginContent) {
                element?.loginContent?.classList.replace("login-content", "login-content-hide");
            }
            if (element?.mobileLoginComponent) {
                element?.mobileLoginComponent?.classList.replace("mobile-login-component", "login-content-hide");
            }

        }, 700);
        setTimeout(() => {
            if (element?.registerContent) {
                element?.registerContent?.classList.add("register-slide-from-bottom-to-center");
                element?.registerContent?.classList.replace("register-content-hide","register-content");
            }
            if (element?.mobileRegisterContent) {
                element.mobileRegisterContent.style.display = "flex";
            }
        }, 1200);


    }

    const changeToLoginComponentForMobile = () => {
        const element = getAllElement();
        element?.coverComponent?.classList.replace("register-slide-from-bottom-to-top", "register-slide-from-top-to-bottom");
        setTimeout(() => {
            if (element?.registerContent) {

                element?.registerContent?.classList.remove("register-slide-from-bottom-to-center");
                element?.registerContent?.classList.replace("register-content", "register-content-hide");
            }

            if (element?.mobileLoginComponent) {
                element?.mobileLoginComponent?.classList.replace("login-content-hide", "mobile-login-component");
            }

        }, 700);
        setTimeout(() => {
            if (element?.loginContent) {
                element?.loginContent?.classList.add("login-slide-from-top-to-center");
                element?.loginContent?.classList.replace("login-content-hide", "login-content");
            }
        }, 1200);
        setTimeout(() => {
            clearAdditionalClass();
        }, 2000);
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
                            <SocialPlatform />
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
                            <div className='mobile-register-component' id="mobile-register-component">
                                <label className="label-text">Already have an account?</label>
                                <SimpleButton className="cover-button" onClick={() => changeToLoginComponentForMobile()}>Login</SimpleButton>
                            </div>
                        </div>
                    </div>
                    <div className='login-content' id="login-content">
                        <div style={{ margin: "auto", padding: "24px 0px" }}>
                            <div className="login-title">Login</div>
                            <SocialPlatform />
                            <div className='mb-4 mt-4'>
                                <TextFieldWithIcon value={txtUsername} icon={faUser} placeholder='Username' onChange={(e: any) => setTxtUsername(e)} />
                            </div>
                            <div className='mb-4 mt-4'>
                                <TextFieldWithIcon type="password" value={txtPassword} icon={faLock} placeholder='Password' onChange={(e: any) => setTxtPassword(e)} />
                            </div>
                            <div className='mb-4 mt-4'>
                                <SimpleButton onClick={() => handleLogin()}>Login</SimpleButton>
                            </div>
                            <a className="forgot-password-text">Forgot Password?</a>
                            <div className='mobile-login-component' id="mobile-login-component">
                                <label className="label-text">Don't have an account?</label>
                                <SimpleButton className="cover-button" onClick={() => changeToRegisterComponentForMobile()}>Register</SimpleButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Loading isLoading={isLoading} />
        </>
    );
}
export default Login;
