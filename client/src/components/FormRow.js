import styled from "styled-components";

const FormRow = ({
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
      <input
        type={type}
        value={value}
        name={name}
        placeholder={labelText || name}
        onChange={handleChange}
        className="form-input"
        disabled={disabled}
      />
      <p className="form-error">{error ? error : " "}</p>
    </Wrapper>
  );
};

export default FormRow;

const Wrapper = styled.div`
  label {
    opacity: ${({ value }) => (value ? "1" : "0")};
    transition: opacity 0.2s linear;
  }
`;
