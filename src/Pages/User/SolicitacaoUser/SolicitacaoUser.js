import { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import styled from "styled-components";
import LoginSidebar from "../../../Components/LoginRegisterSidebar/LoginSidebar";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, doc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
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

const FormWrapper = styled.div`
  width: 100%;
  max-width: 80vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 5vh 10vh;

  max-height: 95vh;
  overflow-y: auto;

  margin: 20px 0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const Title = styled.h1`
  font-size: 3vw;
  color: #0a3d62;
  text-align: center;
  margin-bottom: 30px;
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 25px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 12px 5px;
  height: 45px;
  background-color: #fff;
  margin-bottom: 15px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #00994c;
  }
`;

const MaskedInput = styled(IMaskInput)`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 12px 5px;
  height: 45px;
  background-color: #fff;
  margin-bottom: 15px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #00994c;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 12px 5px;
  height: 45px;
  background-color: #fff;
  margin-bottom: 15px;
  font-size: 16px;
  transition: border-color 0.3s;
  height: 100px;
  width: 100%;
  resize: none;

  &:focus {
    outline: none;
    border-color: #00994c;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  gap: 10px;
`;

const SelectButton = styled.button`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 15px 10px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  font-size: 16px;
  font-weight: 700;
  color: #333;

  &.selected {
    background-color: #00994c;
    border-color: #00994c;
    color: #fff;
  }

  &:hover:not(.selected) {
    background-color: #f0f0f0;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #00994c;
  padding: 15px 20px;
  border-radius: 10px;
  align-items: center;
  margin-top: 30px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #fff;
  font-size: 23px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover {
    background-color: #007a3d;
  }
`;

function SolicitacaoUser() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id: userIdFromURL } = useParams();

  const [pessoaFisica, setPessoaFisica] = useState(null);
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (currentUser && currentUser.id !== userIdFromURL) {
      alert("Acesso negado: ID de usuário na URL não corresponde ao usuário logado.");
      navigate(`/user-home/${currentUser.id}/user-main`);
    }
  }, [currentUser, userIdFromURL, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Usuário não autenticado. Por favor, faça login novamente.");
      navigate("/");
      return;
    }

    try {
      const userRef = doc(db, "usuarios", currentUser.id);
      const solicitacoesRef = collection(userRef, "solicitacoes");

      const dataFormatada = new Date().toLocaleDateString("pt-BR");

      await addDoc(solicitacoesRef, {
        titulo: `Solicitação - ${nome || razaoSocial}`,
        status: "Nova",
        data: dataFormatada,
        descricao,
        cpf,
        cnpj,
        nome,
        razaoSocial,
        email,
        pessoaFisica,
        criadoEm: new Date(),
        userId: currentUser.id, 
      });

      navigate(`/user-home/${currentUser.id}/user-main`);
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
      alert("Erro ao enviar solicitação.");
    }
  };

  return (
    <Container>
      <LoginSidebar position="left" text="SOLICITAÇÕES" larg="25%"/>

      <ContentWrapper>
        <FormWrapper as="form" onSubmit={handleSubmit}>
          <Title>NOVA SOLICITAÇÃO</Title>

          <Label>Pessoa Física?</Label>
          <SelectContainer>
            <SelectButton
              type="button"
              className={pessoaFisica === "sim" ? "selected" : ""}
              onClick={() => setPessoaFisica("sim")}
            >
              Sim
            </SelectButton>

            <SelectButton
              type="button"
              className={pessoaFisica === "nao" ? "selected" : ""}
              onClick={() => setPessoaFisica("nao")}
            >
              Não
            </SelectButton>
          </SelectContainer>

          {pessoaFisica === "sim" && (
            <>
              <Label>CPF</Label>
              <MaskedInput 
                mask="000.000.000-00"
                value={cpf}
                onAccept={(value) => setCpf(value)}
                placeholder="000.000.000-00"
                type="text"
              />

              <Label>Nome Completo (para contato)</Label>
              <Input 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
              />
            </>
          )}

          {pessoaFisica === "nao" && (
            <>
              <Label>CNPJ</Label>
              <MaskedInput 
                mask="00.000.000/000-00"
                value={cnpj}
                onAccept={(value) => setCnpj(value)}
                placeholder="00.000.000/000-00"
                type="text"
              />

              <Label>Razão Social</Label>
              <Input 
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
                type="text"
              />
            </>
          )}

          <Label>E-mail (para contato)</Label>
          <Input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoCapitalize="none"
          />

          <Label>Descrição</Label>
          <TextArea 
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
          />

          <SubmitButton type="submit">ENVIAR SOLICITAÇÃO</SubmitButton>
        </FormWrapper>
      </ContentWrapper>
    </Container>
  );
}

export default SolicitacaoUser;