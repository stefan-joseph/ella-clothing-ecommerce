import { useState, useEffect } from "react";

const useForm = (submitForm, validateForm, formValues, dependencies) => {
  const [values, setValues] = useState({
    ...formValues,
  });

  useEffect(() => {
    setValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, isSubmitting]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
