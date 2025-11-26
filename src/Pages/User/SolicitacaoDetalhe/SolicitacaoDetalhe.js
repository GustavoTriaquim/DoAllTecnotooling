import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const Header = styled.div`
  background-color: #00994c;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.1em;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.3s;
  margin-right: 20px;

  &:hover {
    opacity: 0.8;
  }
`;

const HeaderTitle = styled.h1`
  color: #fff;
  font-size: 1.2em;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
`;

const ScrollableContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.p`
  font-size: 1.1em;
  color: #0a3d62;
  font-weight: 700;
  margin-bottom: 5px;
  margin-top: 15px;
`;

const Value = styled.p`
  font-size: 1em;
  color: #333;
  margin-bottom: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

function SolicitacaoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const solicitacao = {
    id,
    titulo: `Solicitação ${id}`,
    status: "Em análise",
    data: "22/10/2025",
    descricao: "Esta é uma solicitação de exemplo. Aqui você pode mostrar todos os detalhes referentes à solicitação feita pelo usuário. O conteúdo será dinâmico e carregado com base no ID.",
  };

  return (
    <MainContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>{"< VOLTAR"}</BackButton>
        <HeaderTitle>DETALHE DA SOLICITAÇÃO</HeaderTitle>
      </Header>

      <ScrollableContent>
        <Card>
          <Label>ID da Solicitação</Label>
          <Value>{solicitacao.id}</Value>

          <Label>Título</Label>
          <Value>{solicitacao.titulo}</Value>

          <Label>Status</Label>
          <Value>{solicitacao.status}</Value>

          <Label>Data</Label>
          <Value>{solicitacao.data}</Value>

          <Label>Descrição</Label>
          <Value>{solicitacao.descricao}</Value>
        </Card>
      </ScrollableContent>
    </MainContainer>
  );
}

export default SolicitacaoDetalhe;