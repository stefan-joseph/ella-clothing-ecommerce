import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const SocialLinks = () => {
  const { darkMode } = useAppContext();
  return (
    <Wrapper darkMode={darkMode}>
      <a href="http://facebook.com">
        <FaFacebookF />
      </a>
      <a href="http://instagram.com">
        <FaInstagram />
      </a>
      <a href="http://twitter.com">
        <FaTwitter />
      </a>
    </Wrapper>
  );
};

export default SocialLinks;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 0.4rem;
    color: ${({ darkMode }) =>
      darkMode ? "var(--mainColor)" : "var(--backgroundColor)"};
    border: 0.08rem solid var(--mainColor);
    background-color: ${({ darkMode }) =>
      darkMode ? "var(--backgroundColor)" : "var(--mainColor)"};
    svg {
      shape-rendering: crispEdges;
    }
  }

  a:hover {
    color: ${({ darkMode }) =>
      darkMode ? "var(--backgroundColor)" : "var(--mainColor)"};
    border: 0.08rem solid var(--mainColor);
    background-color: ${({ darkMode }) =>
      darkMode ? "var(--mainColor)" : "var(--backgroundColor)"};
    cursor: pointer;
  }
`;
