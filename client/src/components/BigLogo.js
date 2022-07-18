import styled from "styled-components";

const BigLogo = () => {
  return (
    <Wrapper>
      ■<span className="title">ΙΞ L L Λ </span>■
    </Wrapper>
  );
};

export default BigLogo;

const Wrapper = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  .title {
    font-size: 1rem;
    border: 0.5px solid;
    border-radius: 15%;
    padding: 4px 10px;
    margin: 5px;
  }
`;
