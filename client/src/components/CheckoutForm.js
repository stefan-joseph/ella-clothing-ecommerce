import { InfoForm, AddressForm } from ".";

const CheckoutForm = ({ values, errors, onChange, onSubmit }) => {
  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <h3 className="secondary-title">Contact Info</h3>
      <div className="form-center">
        <InfoForm values={values} errors={errors} onChange={onChange} />
      </div>
      <h3 className="secondary-title">Shipping Address</h3>
      <div className="form-center">
        <AddressForm values={values} errors={errors} onChange={onChange} />
      </div>
      <button
        className="submit-btn payment-btn"
        type="submit"
        // disabled={loading}
      >
        {/* {loading ? "please wait..." : "continue to payment"} */}
        continue to payment
      </button>
    </form>
  );
};

export default CheckoutForm;
