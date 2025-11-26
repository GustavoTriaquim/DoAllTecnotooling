import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginSidebar from "../../../Components/LoginRegisterSidebar/LoginSidebar";

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #00994c;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
`;

const HeaderButton = styled.button`
  background-color: #00994c;
  border: 2px solid #fff;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  color: #fff;
  font-size: 1.1em;
  font-weight: 700;
  letter-spacing: 1px;

  &:hover {
    background-color: #007a3d;
  }
`;

const ScrollableContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 4vw;
  font-weight: bold;
  color: #0a3d62;
  text-align: center;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
`;

const Card = styled.div`
  width: 250px;
  height: 120px;
  background-color: #76a9c6;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
`;

const CardStatus = styled.p`
  font-size: 1em;
  color: #eaf0f1;
`;

function UserMain() {
  const [solicitacoes] = useState([
    { id: 1, titulo: "Sol. 1", status: "Em análise" },
    { id: 2, titulo: "Sol. 2", status: "Aprovada" },
    { id: 3, titulo: "Sol. 3", status: "Rejeitada" },
  ]);

  const navigate = useNavigate();

  return(
    <MainContainer>
      <LoginSidebar position="left" text="SOLICITAÇÕES" larg="25%"/>

      <ContentWrapper>
        <Header>
          <HeaderButton onClick={() => navigate("/user-solicitacao")}>NOVA SOLICITAÇÃO</HeaderButton>
        </Header>

        <ScrollableContent>
          <Title>SOLICITAÇÕES</Title>
          
          <Grid>
            {solicitacoes.map((item) => (
              <Card
                key={item.id}
                onClick={() => navigate(`/solicitacao-detalhe/${item.id}`)}
              >
                <CardTitle>{item.titulo}</CardTitle>
                <CardStatus>{item.status}</CardStatus>
              </Card>
            ))}
          </Grid>
        </ScrollableContent>
      </ContentWrapper>
    </MainContainer>
  );
}

export default UserMain;