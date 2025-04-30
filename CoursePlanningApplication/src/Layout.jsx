import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/Login">Login</Link>
          </li>

          <li>
            <Link to="/AcademicTracker">Academic Tracker</Link>
          </li>

          <li>
            <Link to="/CourseSearch">Course Search</Link>
          </li>

          <li>
            <Link to="/Login">Logout</Link>
          </li>

          

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;