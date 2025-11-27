import { useState } from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f2f2f2;
`;

const MainContent = styled.div`
  flex: 1;
`;

const TopBar = styled.button`
  background: #0a703d;
  width: 100%;
  color: white;
  font-weight: bold;
  padding: 20px;
  text-align: center;
  border: none;
  font-size: 1.5vw;
  font-weight: normal;
  font-family: "Jura", sans-serif;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Title = styled.h2`
  margin-top: 25px;
  color: #333;
  text-align: center;
`;

const Grid = styled.div`
  margin: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px;
`;

const Card = styled.div`
  background: #7bb3d9;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.3vw;
  color: #003f5c;
  font-weight: bold;
  &:hover { opacity: 0.8; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const ModalContent = styled.div`
  background: white;
  width: 80%;
  max-width: 500px;
  height: auto;
  max-height: 70vh;
  padding: 25px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 1vw;
`;

const ConfirmButton = styled.button`
  width: 25%;
  height: 5vh;
  font-size: 24px;
  border: none;
  border-radius: 6px;
  background: #2ecc71;
  cursor: pointer;
`;

const RefreshButton = styled.button`
  width: 25%;
  height: 5vh;
  font-size: 24px;
  border: none;
  border-radius: 6px;
  background: #f1c40f;
  cursor: pointer;
`;

function FuncionarioMain() {
  const [aba, setAba] = useState("NOVOS");
  const [modalData, setModalData] = useState(null);

  const navigate = useNavigate();

  const dadosTeste = [
    { id: 298, nome: "José Souza", horario: "07h35m", origem: "Curitiba", existente: false, status: "NOVOS" },
    { id: 310, nome: "Maria Lima", horario: "10h12m", origem: "São Paulo", existente: true, status: "ANÁLISE" },
    { id: 411, nome: "Carlos Dias", horario: "15h22m", origem: "Bahia", existente: false, status: "APROVADOS" },
    { id: 713, nome: "Lucia Santos", horario: "14h30m", origem: "Minas Gerais", existente: false, status: "PERDIDOS" },
  ];

  const solicitacoesFiltradas = dadosTeste.filter(
    (solicitacao) => solicitacao.status === aba
  );

  return(
    <Container>
      <Sidebar current={aba} onChange={setAba}/>

      <MainContent>
        <TopBar onClick={() => navigate("/funcionario-main/nova-solicitacao")}>NOVA SOLICITAÇÃO</TopBar>
        <Title>SOLICITAÇÕES</Title>

        <Grid>
          {solicitacoesFiltradas.map((s) => (
            <Card key={s.id} onClick={() => setModalData(s)}>
              <strong>#{s.id}</strong><br />
              {s.nome}
            </Card>
          ))}
        </Grid>
      </MainContent>

      {modalData && (
        <ModalOverlay onClick={() => setModalData(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize:"4vw", textAlign:"center" }}>#{modalData.id}</h2>
            <h3 style={{ fontSize:"2vw", textAlign: "center" }}>DETALHES DO PEDIDO</h3>
            <p style={{ fontSize:"1.5vw", textAlign: "center" }}><strong>NOME:</strong> {modalData.nome}</p>
            <p style={{ fontSize:"1.5vw", textAlign: "center" }}><strong>HORÁRIO:</strong> {modalData.horario}</p>
            <p style={{ fontSize:"1.5vw", textAlign: "center" }}><strong>ORIGEM:</strong> {modalData.origem}</p>

            <ButtonRow>
              <ConfirmButton>✔</ConfirmButton>
              <RefreshButton>⟳</RefreshButton>
            </ButtonRow>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default FuncionarioMain;