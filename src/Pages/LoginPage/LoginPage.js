import { useState, useEffect } from "react";
import LoginSidebar from "../../Components/LoginRegisterSidebar/LoginSidebar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login, cadastro } from "../../Services/authService";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LoginContainer = styled.main`
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
  margin-top: ${({ isRegistering }) => (isRegistering ? "4vh" : "7vh")};
  margin-bottom: ${({ isRegistering }) => (isRegistering ? "-3vh" : "-10vh")};
  cursor: default;
  text-align: center;
`;

const LoginFormWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LoginForm = styled.form`
  background-color: linear-gradient(to left, #fff, #f0f0f0 );
  border: 1px solid #5757579d;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 60%;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 50px;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Label = styled.label`
  font-size: 2vw;
  font-weight: bold;
  color: #161616;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #3f3f3f;
  outline: none;
  font-size: 1vw;
  width: 100%;
  height: 40px;

  &:focus {
    border-color: #09374e;
  }
`;

const Button = styled.button`
  background-color: #128d51;
  color: #f1f1f1;
  border: none;
  padding: 2vh 5vw;
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

const Question = styled.p`
  font-size: 1.5vw;
  font-weight: bold;
  margin-top: 15px;
  color: #161616;
  cursor: default;
`;

const Link = styled.button`
  background: none;
  border: none;
  color: #09347e;
  cursor: pointer;
  font-size: 1.3vw;
  text-decoration: underline;
  margin-top: 5px;

  &:hover {
    color: #007bff;
  }
`;

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
    setErro("");
  }

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(`/user-home/${user.uid}`);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Tentando com:", { email, senha });
    setErro("");

    if (!email || !senha) {
      const msg = "Preencha todos os campos.";
      setErro(msg);
      alert(msg);
      return;
    }

    if (isRegistering) {
      if (senha !== confirmarSenha) {
        const msg = "As senhas não coincidem.";
        setErro(msg);
        alert(msg);
        return;
      }
      if (!nome) {
        const msg = "Preencha o nome completo.";
        setErro(msg);
        alert(msg);
        return;
      }

      try {
        const user = await cadastro(nome, email, senha);
        navigate(`/user-home/${user.id}`);
      } catch (error) {
        const msg = "Erro ao cadastrar. Verifique se o e-mail já está em uso.";
        setErro(msg);
        alert(msg);
        console.error(error);
      }
      return;
    }

    try {
      const user = await login(email, senha);

      if (!user) {
        const msg = "E-mail ou senha incorretos.";
        setErro(msg);
        alert(msg);
        return;
      }

      if (user.tipoUsuario === "funcionario") {
        navigate("/funcionario-main");
      } else {
        navigate(`/user-home/${user.id}`);
      }
    } catch (error) {
      const msg = "Erro ao fazer login.";
      setErro(msg);
      alert(msg);
      console.error(error);
    }
  }

  return(
    <PageContainer>
      <LoginContainer>
        <Title isRegistering={isRegistering}>{isRegistering ? "CADASTRO" : "LOGIN"}</Title>

        <LoginFormWrapper>
          <LoginForm onSubmit={handleSubmit}>
            <FieldWrapper>

              {isRegistering && (
                <Fields>
                  <Label>Nome Completo</Label>
                  <Input 
                    type="text" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </Fields>
              )}

              <Fields>
                <Label>E-mail</Label>
                <Input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Fields>

              <Fields>
                <Label>Senha</Label>
                <Input 
                  type="password" 
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </Fields>

              {isRegistering && (
                <Fields>
                  <Label>Confirmar Senha</Label>
                  <Input 
                    type="password" 
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                  />
                </Fields>
              )}
            </FieldWrapper>

            <Button type="submit">{isRegistering ? "CADASTRAR" : "FAZER LOGIN"}</Button>
          </LoginForm>
          <Question>{isRegistering ? "Já possui login?" : "Não possui login?"}</Question>
          <Link onClick={toggleMode}>{isRegistering ? "Fazer Login" : "Cadastrar-se"}</Link>
        </LoginFormWrapper>
      </LoginContainer>

      <LoginSidebar position="right" text="LOGIN E CADASTRO" />
    </PageContainer>
  );
}

export default LoginPage;