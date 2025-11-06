import styled from "styled-components";
import logo from "../../Assets/Logo.png";

const SidebarContainer = styled.div`
  width: ${({ larg }) => larg};
  height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ position }) =>
    position === "left"
      ? "5px 0 15px rgba(0, 0, 0, 0.1)"
      : "-5px 0 15px rgba(0, 0, 0, 0.1)"};
`;

const Image = styled.img`
  width: 70%;
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
  font-size: 3vw;
  text-align: center;
  cursor: default;
`;

const Span = styled.span`
  color: #09374E;
  font-size: 3.2vw;
  text-align: center;
  cursor: default;
`;

function LoginSidebar({ position = "right", text = "", larg="35%" }) {
  return(
    <SidebarContainer position={position} larg={larg}>
      <Image src={logo} alt="Logo DO ALL"/>
      <Diviser>
        <Subtitle>CRM</Subtitle>
      </Diviser>
      <Span>{text}</Span>
    </SidebarContainer>
  );
}

export default LoginSidebar;