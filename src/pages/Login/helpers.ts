interface Values {
    email?: string;
    password?: string;
  }

export const validate = (values: Values) => {
    const errors: Values = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
  
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 5) {
      errors.password = "Must be 5 characters or more";
    } else if (values.password.length > 15) {
      errors.password = "Must be 15 characters or less";
    }
  
    return errors;
  };