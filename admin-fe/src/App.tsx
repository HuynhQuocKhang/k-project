import { jwtDecode } from "jwt-decode";
import { useAuth } from "./context/AuthContext";
import { showToast } from "./utils/toast-function";
import Admin from "./pages/Admin/Admin";
import '../src/App.css'
function App() {
  const { authToken } = useAuth();
  const checkJwt = (token: any) => {
    console.log("token", token)

    if (!token) {
      showToast("warning", "Please login");
      return false;  // Token doesn't exist
    }

    try {
      const decoded = jwtDecode(token);
      console.log("decoded", decoded)
      // Optional: Check if the token has expired
      const currentTime = Date.now(); // Current time in seconds
      console.log("currentTime", currentTime)
      console.log("decoded?.exp", decoded?.exp)
      console.log("decoded.exp * 1000", decoded?.exp == null ? 0 : decoded.exp * 1000)

      if (decoded?.exp != undefined && decoded.exp * 1000 < currentTime) {
        showToast("warning", "Login session has expired");
        return false;  // Token has expired
      }

      return true;  // Return decoded token if it's valid
    } catch (error) {
      console.error("Invalid token", error);
      return false;  // Return false if the token is invalid
    }
  };

  const isAuthenticated = checkJwt(authToken);
  if (!isAuthenticated) {
    setTimeout(() => {
      window.location.href = process.env.REACT_APP_IS_DEVELOPMENT === "true" ? 'http://localhost:3000' : 'http://auth.hqkhang.io.vn';
    }, 3000);
    return <>Login session has expired, you will be redirect to Login Site in 3 seconds</>
  }
  return (
    <Admin />
  );
}

export default App;
