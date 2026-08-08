import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true });

export const validateSchema = (schema: object, responseBody: object) => {
  const validate = ajv.compile(schema);
  const valid = validate(responseBody);
  if (!valid) {
    throw new Error(
      `Error de Esquema JSON:\n${JSON.stringify(validate.errors, null, 2)}`
    );
  }
};