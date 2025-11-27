import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginSidebar from "../../../Components/LoginRegisterSidebar/LoginSidebar";
import { useAuth } from "../../../Services/authContext";

const PageContainer = styled.main`
  display: flex;
  height: 100vh;
`;

const MenuContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 6vw;
  color: #09374e;
  letter-spacing: 2px;
  margin-top: 7vh;
  cursor: default;
  text-align: center;
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30vh;
  width: 70%;
  gap: 5vh;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: #128d51;
  color: #f1f1f1;
  border: none;
  padding: 3vh 5vw;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  transition: 0.3s;
  width: 70%;
  font-size: 1.7vw;
  font-family: 'Jura', sans-serif;

  &:hover {
    transform: scale(1.05);
    background-color: #0d6d3fff;
  }
`;

function HomeUser () {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.id : null;

  if (!userId) {
    return <div>Carregando...</div>;
  }

  return(
   <PageContainer>
    <LoginSidebar position="left" text="SOLICITAÇÕES" larg="25%" />

    <MenuContainer>
      <Title>MENU PRINCIPAL</Title>
      
      <ButtonsDiv>
        <Button onClick={() => navigate(`/user-home/${userId}/user-solicitacao`)}>NOVA SOLICITAÇÃO</Button>
        <Button onClick={() => navigate(`/user-home/${userId}/user-main`)}>MINHAS SOLICITAÇÕES</Button>
      </ButtonsDiv>
    </MenuContainer>
  </PageContainer>
  );
}

export default HomeUser;