
const expenseService = require('../../api/services/expense.service');

const renderExpense = async(req, res) => {
    try {

        const listExpense = await expenseService.getListExpenseByUsername({
            username: req.jwtDecode.username,
            page: 1,
            perPage: 10
        });
        console.log('data: ', listExpense);
        //const 
        res.render('expense',{
            layout: 'expense',
            user: req.jwtDecode,
            listExpense: listExpense.data,
            total: listExpense.total,
            totalPages: listExpense.pages
        });
    } catch (error) {
        console.log('error: ',error);
    }
}


module.exports = {
    renderExpense
};