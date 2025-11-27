import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomeUser from "./Pages/User/HomeUser/HomeUser";
import SolicitacaoUser from "./Pages/User/SolicitacaoUser/SolicitacaoUser";
import UserMain from "./Pages/User/UserMain/UserMain";
import SolicitacaoDetalhe from "./Pages/User/SolicitacaoDetalhe/SolicitacaoDetalhe";
import FuncionarioMain from "./Pages/Funcionario/FuncionarioMain/FuncionarioMain";
import FuncionarioNovaSolicitacao from "./Pages/Funcionario/FuncionarioNovaSolicitacao/FuncionarioNovaSolicitacao";
import { AuthProvider, useAuth } from "./Services/authContext";

// Componente de Rota Privada
function PrivateRoute({ children, allowedRoles }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.tipoUsuario)) {
    return <Navigate to="/unauthorized" />;
  }

  const userId = currentUser.id;
  const childrenWithProps = React.cloneElement(children, { userId });

  return childrenWithProps;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      <Route 
        path="/user-home/:id" 
        element={
          <PrivateRoute allowedRoles={["cliente"]}>
            <HomeUser />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/user-home/:id/user-main" 
        element={
          <PrivateRoute allowedRoles={["cliente"]}>
            <UserMain />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/user-home/:id/user-solicitacao" 
        element={
          <PrivateRoute allowedRoles={["cliente"]}>
            <SolicitacaoUser />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/solicitacao-detalhe/:id" 
        element={
          <PrivateRoute allowedRoles={["cliente", "funcionario"]}>
            <SolicitacaoDetalhe />
          </PrivateRoute>
        } 
      />

      <Route 
        path="/funcionario-main" 
        element={
          <PrivateRoute allowedRoles={["funcionario"]}>
            <FuncionarioMain />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/funcionario-main/nova-solicitacao" 
        element={
          <PrivateRoute allowedRoles={["funcionario"]}>
            <FuncionarioNovaSolicitacao />
          </PrivateRoute>
        } 
      />

      <Route path="/unauthorized" element={<div>Acesso Não Autorizado</div>} />
      <Route path="*" element={<div>Página Não Encontrada</div>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;