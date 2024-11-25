import { Outlet, Link } from "react-router-dom";
const NavigateBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/manage-account">ManageAccount</Link>
          </li>
          <li>
            <Link to="/not-found">Not found</Link>
          </li>
          <li>
            <Link to="/success">Success</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default NavigateBar;