import Joi from "joi";
const formikValidateUsingJoi = (schema) => {
  return (values) => {
    const { error } = Joi.object(schema).validate(values, {
      abortEarly: false,
    });
    if (!error) {
      return null;
    }
    const errors = {};
    for (const detail of error.details) {
      const errorName = detail.path[0];

      errors[errorName] = detail.message
        .replaceAll('"', " ")
        .replaceAll("rePassword", "confirmation password")
        .replaceAll("postContent", "create a post field")
        .replaceAll("firstName", "First Name")
        .replaceAll("lastName", "Last Name");
    }
    return errors;
  };
};
export default formikValidateUsingJoi;
