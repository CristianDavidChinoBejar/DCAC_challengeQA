import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

export const validateSchema = (schema: object, responseBody: object) => {
  const valid = ajv.validate(schema, responseBody);

  if (!valid) {
    const errorDetails = ajv.errorsText(ajv.errors, { separator: '\n - ' });
    
    throw new Error(
      `Error de Validación de Contrato JSON:\n - ${errorDetails}\n\nPayload obtenido:\n${JSON.stringify(responseBody, null, 2)}`
    );
  }
};