import { FormRow } from ".";
import { useAppContext } from "../context/appContext";

const InfoForm = ({ values, errors, onChange }) => {
  const { loading } = useAppContext();
  return (
    <>
      <FormRow
        type="text"
        labelText="first name"
        name="firstName"
        value={values.firstName}
        handleChange={onChange}
        error={errors.firstName}
        disabled={loading}
      />
      <FormRow
        type="text"
        labelText="last name"
        name="lastName"
        value={values.lastName}
        handleChange={onChange}
        error={errors.lastName}
        disabled={loading}
      />
      <FormRow
        type="email"
        name="email"
        value={values.email}
        handleChange={onChange}
        error={errors.email}
        disabled={loading}
      />
    </>
  );
};

export default InfoForm;
