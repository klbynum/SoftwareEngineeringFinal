import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import AcademicTracker from "./Pages/AcademicTracker/AcademicTracker.jsx";
import CourseSearch from "./Pages/CourseSearch/CourseSearch.jsx";
import Sections from './Pages/CourseSearch/Sections.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="AcademicTracker" element={<AcademicTracker />} />
          <Route path="CourseSearch" element={<CourseSearch />} />
          <Route path="/sections/:courseId" element={<Sections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
