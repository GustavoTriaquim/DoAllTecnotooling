import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;