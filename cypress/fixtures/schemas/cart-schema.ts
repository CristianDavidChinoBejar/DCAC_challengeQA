export const cartSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    userId: { type: 'number' },
    date: { type: 'string' },
    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          productId: { type: 'number' },
          quantity: { type: 'number' }
        },
        required: ['productId', 'quantity']
      }
    }
  },
  required: ['id', 'userId', 'date', 'products']
};