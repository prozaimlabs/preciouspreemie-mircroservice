export const stripe = {
    charges: {
        create: jest.fn().mockResolvedValue({ id: '001_test' }),
    },
};
