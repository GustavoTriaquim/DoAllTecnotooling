import styled from "styled-components";
import logo from "../../Assets/Logo.png";

const SidebarContainer = styled.div`
  right: 0;
  top: 0;
  width: 35%;
  height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 400px;
  margin-bottom: 10px;
`;

const Diviser = styled.div`
  background-color: #09374E;
  width: 100%;
  padding: 20px 0px;
  margin: 5vh 0;
`;

const Subtitle = styled.h3`
  color: #f1f1f1;
  font-weight: normal;
  font-size: 50px;
  text-align: center;
`;

const Span = styled.span`
  color: #09374E;
  font-size: 40px;
  text-align: center;
`;

function LoginSidebar() {
  return(
    <SidebarContainer>
      <Image src={logo} alt="Logo DO ALL"/>
      <Diviser>
        <Subtitle>CRM</Subtitle>
      </Diviser>
      <Span>LOGIN E CADASTRO</Span>
    </SidebarContainer>
  );
}

export default LoginSidebar;