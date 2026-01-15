import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/SignUp";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      {/* Navbar stays outside <Routes> so it shows on every page.
          No <BrowserRouter> here because it's already in main.jsx! 
      */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;