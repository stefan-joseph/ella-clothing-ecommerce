import styled from "styled-components";

const SmallLogo = () => {
  return (
    <Wrapper>
      ■<span className="title">ΙΞ</span>■
    </Wrapper>
  );
};

export default SmallLogo;

const Wrapper = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  .title {
    font-size: 1rem;
    border: 0.5px solid;
    border-radius: 15%;
    padding: 4px 6px;
    margin: 0 3px;
  }
`;
