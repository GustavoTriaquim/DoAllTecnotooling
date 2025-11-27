import styled from "styled-components";
import logo from "../../Assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Services/authService";

const SidebarContainer = styled.div`
  width: 25%;
  height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
`;

const Image = styled.img`
  width: 70%;
  margin-bottom: 30px;
`;

const NavItem = styled.button`
  width: 80%;
  padding: 15px 20px;
  margin: 10px 0;
  background-color: ${({ active }) => (active ? "#09374E" : "transparent")};
  color: ${({ active }) => (active ? "#f1f1f1" : "#09374E")};
  border: none;
  border-radius: 10px;
  font-size: 1.5vw;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;

  &:hover {
    background-color: #09374E;
    color: #f1f1f1;
  }
`;

const LogoutButton = styled(NavItem)`
  margin-top: auto;
  margin-bottom: 20px;
  background-color: #d9534f;
  color: #f1f1f1;

  &:hover {
    background-color: #c9302c;
  }
`;

function Sidebar({ activePage, userId }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      alert("Erro ao fazer logout.");
      console.error("Logout error:", error);
    }
  };

  return (
    <SidebarContainer>
      <Image src={logo} alt="Logo DO ALL" />

      <NavItem
        active={activePage === "main"}
        onClick={() => handleNavigation(`/user-home/${userId}/user-main`)}
      >
        Minhas Solicitações
      </NavItem>

      <NavItem
        active={activePage === "solicitacao"}
        onClick={() => handleNavigation(`/user-home/${userId}/user-solicitacao`)}
      >
        Nova Solicitação
      </NavItem>

      <LogoutButton onClick={handleLogout}>
        Sair
      </LogoutButton>
    </SidebarContainer>
  );
}

export default Sidebar;