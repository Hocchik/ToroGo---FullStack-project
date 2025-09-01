import Property from '../models/propertyModel.js';

export const createProperty = async (req, res) => {
    try {
        const property = new Property(req.body);
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Más funciones para obtener propiedades, etc.