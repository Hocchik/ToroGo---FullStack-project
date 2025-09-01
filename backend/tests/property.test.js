import request from 'supertest';
import app from '../index.js'; // Asegúrate de exportar tu app en index.js

describe('POST /api/properties', () => {
    it('debería crear una nueva propiedad', async () => {
        const response = await request(app)
            .post('/api/properties')
            .send({
                title: 'Casa en Lima',
                description: 'Una hermosa casa en el centro',
                price: 150000,
                location: 'Lima, Perú',
                type: 'buy',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'Casa en Lima');
    });
});