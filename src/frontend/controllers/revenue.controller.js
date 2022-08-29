const revenueService = require('../../api/services/revenue.service');
const statusRevenueService = require('../../api/services/status_revenue.service');
const renderRevenue = async(req, res) => {
    try {
        const listRevenue = await revenueService.getListRevenueByUsername({
            username: req.jwtDecode.username,
            page: 1,
            perPage: 10
        });
        const listStatusRevenue = await statusRevenueService.getListStatusRevenue();
        //console.log('data1: ', listStatusExpense);
        //const 
        res.render('revenue',{
            layout: 'revenue',
            user: req.jwtDecode,
            listRevenue: listRevenue.data,
            total: listRevenue.total,
            totalPages: listRevenue.pages,
            listStatus: listStatusRevenue
        });
    } catch (error) {
        console.log('error: ',error);
    }
}


module.exports = {
    renderRevenue
};