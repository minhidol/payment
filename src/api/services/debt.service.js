var debtModel = require('../models/debt.model');


const createDebtModel = async(data) => {
    try{
        return await debtModel.create(data);
    }catch(err){
        throw err;
    }
}


module.exports = {
    createDebtModel
}