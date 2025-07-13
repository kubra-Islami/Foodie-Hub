const customerDAO = require('../DAO/customer');

exports.createCustomer = (data) => customerDAO.create(data);
exports.getAllCustomers = () => customerDAO.getAll();
exports.updateCustomer = (id, data) => customerDAO.update(id, data);
exports.deleteCustomer = (id) => customerDAO.remove(id);


