import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { useAuth } from "../../../Services/authContext";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa, #c3cef2);
`;

const DetailWrapper = styled.div`
  width: 100%;
  max-width: 80vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 5vh 10vh;
  max-height: 95vh;
  overflow-y: auto;
  margin: 20px 0;
`;

const Title = styled.h1`
  font-size: 3vw;
  color: #0a3d62;
  text-align: center;
  margin-bottom: 30px;
`;

const DetailItem = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
`;

const Value = styled.p`
  font-size: 1.1em;
  color: #555;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

function SolicitacaoDetalhe() {
  const { id } = useParams();
  const [solicitacao, setSolicitacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!id) return;

    async function carregarDetalhes() {
      try {
        const docRef = doc(db, "solicitacoes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSolicitacao({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Nenhum documento encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da solicitação:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDetalhes();
  }, [id]);

  if (loading) {
    return <div>Carregando detalhes da solicitação...</div>;
  }

  if (!solicitacao) {
    return <div>Solicitação não encontrada.</div>;
  }

  const isOwner = currentUser && solicitacao.userId === currentUser.id;
  const isFuncionario = currentUser && currentUser.tipoUsuario === "funcionario";

  if (!isOwner && !isFuncionario) {
    return <div>Você não tem permissão para visualizar esta solicitação.</div>;
  }

  const userId = currentUser ? currentUser.id : null;

  return (
    <Container>
      {userId && <Sidebar activePage="main" userId={userId} />}

      <ContentWrapper>
        <DetailWrapper>
          <Title>Detalhes da Solicitação</Title>

          <DetailItem>
            <Label>Título:</Label>
            <Value>{solicitacao.titulo}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Status:</Label>
            <Value>{solicitacao.status}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Data:</Label>
            <Value>{solicitacao.data}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Pessoa Física:</Label>
            <Value>{solicitacao.pessoaFisica === "sim" ? "Sim" : "Não"}</Value>
          </DetailItem>

          {solicitacao.pessoaFisica === "sim" ? (
            <>
              <DetailItem>
                <Label>Nome:</Label>
                <Value>{solicitacao.nome}</Value>
              </DetailItem>
              <DetailItem>
                <Label>CPF:</Label>
                <Value>{solicitacao.cpf}</Value>
              </DetailItem>
            </>
          ) : (
            <>
              <DetailItem>
                <Label>Razão Social:</Label>
                <Value>{solicitacao.razaoSocial}</Value>
              </DetailItem>
              <DetailItem>
                <Label>CNPJ:</Label>
                <Value>{solicitacao.cnpj}</Value>
              </DetailItem>
            </>
          )}

          <DetailItem>
            <Label>E-mail:</Label>
            <Value>{solicitacao.email}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Descrição:</Label>
            <Value>{solicitacao.descricao}</Value>
          </DetailItem>
          
        </DetailWrapper>
      </ContentWrapper>
    </Container>
  );
}

export default SolicitacaoDetalhe;