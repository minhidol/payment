const debtService = require('../services/debt.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');

const handleCreateDebt = async(req, res) => {
    try {
        await debtService.createDebtModel(req.body);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}




module.exports = {
    handleCreateDebt
}