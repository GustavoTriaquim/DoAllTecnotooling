import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs }  from "firebase/firestore";
import { useAuth } from "../../../Services/authContext";

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
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    async function carregarSolicitacoes() {
      try {
        const q = query(
          collection(db, "solicitacoes"),
          where("userId", "==", currentUser.id)
        );

        const snap = await getDocs(q);

        const lista = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSolicitacoes(lista);
      } catch (e) {
        console.error("Erro ao carregar solicitacoes:", e);
      }
    }

    carregarSolicitacoes();
  }, [currentUser]);

  const userId = currentUser ? currentUser.id : id;

  return(
    <MainContainer>
      <Sidebar activePage="main" userId={userId} />

      <ContentWrapper>
        <Header>
          <HeaderButton onClick={() => navigate(`/user-home/${userId}/user-solicitacao`)}>NOVA SOLICITAÇÃO</HeaderButton>
        </Header>

        <ScrollableContent>
          <Title>SOLICITAÇÕES</Title>
          
          <Grid>
            {solicitacoes.length === 0 && (
              <p>Nenhuma solicitação criada.</p>
            )}

            {solicitacoes.map((item) => (
              <Card
                key={item.id}
                onClick={() =>
                  navigate(`/solicitacao-detalhe/${item.id}`)
                }
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