import { LoginForm } from "../components";
import styled from "styled-components";

const Login = () => {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: grid;
  align-items: center;
`;
