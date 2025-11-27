import styled from "styled-components";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f2f2f2;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px 40px;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 10px;
  color: #09374e;
  font-size: 3vw;
`;

const FormBox = styled.div`
  margin-top: 30px;
  background: white;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
  font-family: "Jura", sans-serif;
  color: #09374e;
  font-weight: normal;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

const Label = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitBar = styled.button`
  position: fixed;
  bottom: 0;
  left: 15vw;
  width: calc(100% - 15vw);
  background: #0a703d;
  padding: 8px;
  text-align: center;
  color: white;
  border: none;
  font-family: "Jura", sans-serif;
  font-size: 1.5vw;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

function FuncionarioNovaSolicitacao() {
  const navigate = useNavigate();

  return(
    <Container>
      <Sidebar current="" onChange={() => {}} />

      <MainContent>
        <Title>NOVA SOLICITAÇÃO</Title>

        <FormBox>
          <SectionTitle>Dados Solicitante</SectionTitle>

          <FormGrid>
            <div>
              <Label>Empresa</Label>
              <Input />
            </div>

            <div>
              <Label>Quantidade</Label>
              <Input />
            </div>

            <div>
              <Label>Nº NF</Label>
              <Input />
            </div>

            <div>
              <Label>Data de Emissão</Label>
              <Input type="date" />
            </div>

            <div>
              <Label>Pedido</Label>
              <Input />
            </div>

            <div>
              <Label>Solicitante</Label>
              <Input />
            </div>

            <div style={{ gridColumn: "span 4" }}>
              <Label>Descrição</Label>
              <Input />
            </div>
          </FormGrid>
        </FormBox>

        <SubmitBar onClick={() => navigate("/funcionario-main")}>ENVIAR SOLICITAÇÃO</SubmitBar>
      </MainContent>
    </Container>
  );
}

export default FuncionarioNovaSolicitacao;