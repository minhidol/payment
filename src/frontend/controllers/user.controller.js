

const managerUser = async(req, res) => {
    try {
        console.log('req: ', req.cookies)
        res.render('formCreateUser');
    } catch (error) {
        console.log('error');
    }
}


module.exports = {
    managerUser
};