//const revenueService = require('../../api/services/revenue.service');
//const statusRevenueService = require('../../api/services/status_revenue.service');


const renderInterestLoans = async(req, res) => {
    try {
        // const listRevenue = await revenueService.getListRevenueByUsername({
        //     username: req.jwtDecode.username,
        //     page: 1,
        //     perPage: 10
        // });
        // const listStatusRevenue = await statusRevenueService.getListStatusRevenue();
        res.render('interestLoans',{
            layout: 'interest_loans',
            user: req.jwtDecode,
            // listRevenue: listRevenue.data,
            // total: listRevenue.total,
            // totalPages: listRevenue.pages,
            // listStatus: listStatusRevenue
        });
    } catch (error) {
        console.log('error: ',error);
    }
}


module.exports = {
    renderInterestLoans
};