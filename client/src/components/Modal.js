import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const Modal = ({ window, onClose }) => {
  const { loading } = useAppContext();

  return (
    <Wrapper>
      <div className="cover" onClick={onClose}></div>
      <div className="modal-window">
        {window}
        <button
          className="close-btn highlight-reverse"
          onClick={onClose}
          disabled={loading}
        >
          ＋
        </button>
      </div>
    </Wrapper>
  );
};

export default Modal;

const Wrapper = styled.aside`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 98;
  .cover {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
    z-index: 98;
    visibility: visible;
  }

  .modal-window {
    display: flex;
    position: fixed;
    padding: 2rem 4rem;
    width: fit-content;
    max-width: 94vw;
    height: fit-content;
    max-height: 100vh;
    align-items: center;
    justify-content: center;
    justify-items: center;
    background-color: var(--backgroundColor);
    z-index: 99;
    border: 2px solid var(--mainColor);
    border-radius: var(--borderRadius);
  }

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 3rem;
    font-weight: 100;
    transform: rotate(45deg);
    z-index: 99;
  }

  .close-btn:disabled {
    cursor: default;
    opacity: 0.1;
  }
`;
