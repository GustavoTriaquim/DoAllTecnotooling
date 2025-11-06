import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomeUser from "./Pages/User/HomeUser/HomeUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-home" element={<HomeUser />} />
      </Routes>
    </Router>
  );
}

export default App;