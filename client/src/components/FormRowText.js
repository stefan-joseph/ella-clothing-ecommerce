import styled from "styled-components";

const FormRowText = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  disabled,
  error,
}) => {
  return (
    <Wrapper className="form-row" value={value}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <textarea
        type={type}
        value={value}
        name={name}
        placeholder={labelText || name}
        onChange={handleChange}
        className="form-textarea"
        disabled={disabled}
      />
      <p className="form-error">{error ? error : " "}</p>
    </Wrapper>
  );
};

export default FormRowText;

const Wrapper = styled.div`
  .form-label {
    opacity: ${({ value }) => (value ? "1" : "0")};
    transition: opacity 0.3s linear;
    margin-bottom: 0.1rem;
  }
`;
