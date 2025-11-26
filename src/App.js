import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomeUser from "./Pages/User/HomeUser/HomeUser";
import SolicitacaoUser from "./Pages/User/SolicitacaoUser/SolicitacaoUser";
import UserMain from "./Pages/User/UserMain/UserMain";
import SolicitacaoDetalhe from "./Pages/User/SolicitacaoDetalhe/SolicitacaoDetalhe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-home" element={<HomeUser />} />
        <Route path="/user-solicitacao" element={<SolicitacaoUser />} />
        <Route path="/user-main" element={<UserMain />} />
        <Route path="/solicitacao-detalhe/:id" element={<SolicitacaoDetalhe />} />
      </Routes>
    </Router>
  );
}

export default App;