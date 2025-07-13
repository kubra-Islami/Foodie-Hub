const customerService = require('../services/customerService');

exports.addCustomer = async (req, res) => {
    try {
        const newCustomer = await customerService.createCustomer(req.body);
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const updated = await customerService.updateCustomer(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Customer not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await customerService.deleteCustomer(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Customer not found' });
        res.json({ message: 'Customer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
