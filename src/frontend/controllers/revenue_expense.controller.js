
const revenueExpenseService = require('../../api/services/revenue_expense.service');
const groupPermissionService = require('../../api/services/permission_group.service');

const renderRevenueExpense = async(req, res) => {
    try {

        const listRevenueExpense = await revenueExpenseService.getListRevenueExpenseByUsername({
            username: req.jwtDecode.username,
            page: 1,
            perPage: 10
        });
        console.log('data: ', listRevenueExpense);
        //const 
        res.render('revenueExpense',{
            layout: 'revenue-expense',
            user: req.jwtDecode,
            listRevenueExpense: listRevenueExpense.data,
            total: listRevenueExpense.total,
            totalPages: listRevenueExpense.pages
        });
    } catch (error) {
        console.log('error: ',error);
    }
}


module.exports = {
    renderRevenueExpense
};