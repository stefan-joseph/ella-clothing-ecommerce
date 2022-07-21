import styled from "styled-components";

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  error,
  disabled,
}) => {
  return (
    <Wrapper className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
        required
        disabled={disabled}
      >
        <option value="" disabled>
          {(labelText || name).charAt(0).toUpperCase() +
            (labelText || name).slice(1)}
        </option>
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
      <p className="form-error">{error ? error : " "}</p>
    </Wrapper>
  );
};

export default FormRowSelect;

const Wrapper = styled.div``;
