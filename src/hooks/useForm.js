import { useState } from "react";

// This hook manages the values of a form.
// Instead of writing a useState for title, one for amount, one for category...
// I just put them all in ONE object and let this hook handle the changes.
// This was the part I found the hardest to understand honestly, but it makes
// the ExpenseForm component so much shorter.

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  // this one function can handle ANY input field
  // because we read the "name" attribute of the input to know which field to update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues, // keep all the other fields the same
      [name]: value, // only update the one field that changed
    }));
  };

  // resets the form back to empty / default values
  // useful after we submit the form so it clears out
  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm, setValues };
}

export default useForm;
