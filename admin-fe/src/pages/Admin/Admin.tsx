import { useState } from "react";
import Loading from "../../controls/Loading/Loading";
import Cookies from 'universal-cookie';
import './Admin.scss'
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
