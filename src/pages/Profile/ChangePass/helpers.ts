interface Values {
    firstpass?: string;
    secondpass?: string;
  }
  
export const validate = (values: Values) => {
    const errors: Values = {};
  
    if (!values.firstpass) {
      errors.firstpass = "Required";
    } else if (values.firstpass.length < 5) {
      errors.firstpass = "Must be 5 characters or more";
    } else if (values.firstpass.length > 15) {
      errors.firstpass = "Must be 15 characters or less";
    }
    if (!values.secondpass) {
      errors.secondpass = "Required";
    } else if (values.secondpass.length < 5) {
      errors.secondpass = "Must be 5 characters or more";
    } else if (values.secondpass.length > 15) {
      errors.secondpass = "Must be 15 characters or less";
    }
  
    return errors;
  };