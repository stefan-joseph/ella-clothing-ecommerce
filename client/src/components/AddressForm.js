import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import { shippingRates } from "../utils/ShippingRates";

const AddressForm = ({ values, errors, onChange }) => {
  const { loading } = useAppContext();

  return (
    <>
      <FormRow
        type="text"
        name="street"
        value={values.street}
        handleChange={onChange}
        error={errors.street}
        disabled={loading}
      />
      <FormRow
        type="text"
        name="city"
        value={values.city}
        handleChange={onChange}
        error={errors.city}
        disabled={loading}
      />
      <FormRowSelect
        type="text"
        name="state"
        value={values.state}
        handleChange={onChange}
        list={Object.keys(shippingRates.USA)}
        error={errors.state}
        disabled={loading}
      />
      <FormRowSelect
        type="text"
        name="country"
        value={values.country}
        handleChange={onChange}
        list={Object.keys(shippingRates)}
        error={errors.country}
        disabled={loading}
      />
      <FormRow
        type="text"
        labelText="zip code"
        name="zip"
        value={values.zip}
        handleChange={onChange}
        error={errors.zip}
        disabled={loading}
      />
      <FormRow
        type="text"
        labelText="telephone number"
        name="tel"
        value={values.tel}
        handleChange={onChange}
        error={errors.tel}
        disabled={loading}
      />
    </>
  );
};

export default AddressForm;
