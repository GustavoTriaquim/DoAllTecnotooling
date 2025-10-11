import { useState } from "react";
import LoginSidebar from "../../Components/LoginRegisterSidebar/LoginSidebar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  font-size: 100px;
  color: #09374e;
  letter-spacing: 2px;
  position: absolute;
  top: ${({ isRegistering }) => (isRegistering ? "30px" : "100px")};
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
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
  font-size: 20px;
  font-weight: bold;
  color: #161616;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #3f3f3f;
  outline: none;
  font-size: 16px;
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
  padding: 13px 100px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  transition: 0.3s;
  width: 70%;
  font-size: 35px;
  font-family: 'Jura', sans-serif;

  &:hover {
    transform: scale(1.05);
    background-color: #0d6d3fff;
  }
`;

const Question = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
  color: #161616;
`;

const Link = styled.button`
  background: none;
  border: none;
  color: #09347e;
  cursor: pointer;
  font-size: 20px;
  text-decoration: underline;
  margin-top: 5px;

  &:hover {
    color: #007bff;
  }
`;

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
  }

  const navigate = useNavigate();

  return(
    <PageContainer>
      <LoginContainer>
        <Title isRegistering={isRegistering}>{isRegistering ? "CADASTRO" : "LOGIN"}</Title>

        <LoginFormWrapper>
          <LoginForm>
            <FieldWrapper>

              {isRegistering && (
                <Fields>
                  <Label>Nome Completo</Label>
                  <Input type="text" placeholder="Digite seu nome completo" />
                </Fields>
              )}

              <Fields>
                <Label>E-mail</Label>
                <Input type="email" placeholder="exemplo@email.com"/>
              </Fields>

              <Fields>
                <Label>Senha</Label>
                <Input type="password" />
              </Fields>

              {isRegistering && (
                <Fields>
                  <Label>Confirmar Senha</Label>
                  <Input type="password" />
                </Fields>
              )}
            </FieldWrapper>

            <Button onClick={() => navigate("/404")}>{isRegistering ? "CADASTRAR" : "FAZER LOGIN"}</Button>
          </LoginForm>
          <Question>{isRegistering ? "Já possui login?" : "Não possui login?"}</Question>
          <Link onClick={toggleMode}>{isRegistering ? "Fazer Login" : "Cadastrar-se"}</Link>
        </LoginFormWrapper>
      </LoginContainer>

      <LoginSidebar />
    </PageContainer>
  );
}

export default LoginPage;