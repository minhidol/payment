const statusService = require('../../api/services/status.service');
const LoansService = require('../../api/services/interest_loans.service');


const renderInterestLoans = async(req, res) => {
    try {
        const listLoans = await LoansService.getListInterestLoansByUsername({
            username: req.jwtDecode.username,
            page: 1,
            perPage: 10
        });
        const listStatusInterestLoans = await statusService.getListStatusInterestLoans();
        res.render('interestLoans',{
            layout: 'interest_loans',
            user: req.jwtDecode,
            listStatusInterest: listStatusInterestLoans,
            listLoans: listLoans.data,
            total: listLoans.total,
            totalPages: listLoans.pages,
            //listStatus: listStatusRevenue
        });
    } catch (error) {
        console.log('error: ',error);
    }
}


module.exports = {
    renderInterestLoans
};