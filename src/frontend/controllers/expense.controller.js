const expenseService = require('../../api/services/expense.service');
const statusExpenseService = require('../../api/services/status_expense.service');
const renderExpense = async(req, res) => {
    try {

        const listExpense = await expenseService.getListExpenseByUsername({
            username: req.jwtDecode.username,
            page: 1,
            perPage: 10
        });
        const listStatusExpense = await statusExpenseService.getListStatusExpense();
        console.log('data1: ', listStatusExpense);
        //const 
        res.render('expense',{
            layout: 'expense',
            user: req.jwtDecode,
            listExpense: listExpense.data,
            total: listExpense.total,
            totalPages: listExpense.pages,
            listStatus: listStatusExpense
        });
    } catch (error) {
        console.log('error: ',error);
    }
}


module.exports = {
    renderExpense
};