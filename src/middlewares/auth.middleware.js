const {rsError, rsErrorUnauthorized, rsErrorTokenExpired, rsErrorInvalid} = require('../api/helpers/response');
const constants = require('../constants/constants');
const {config} = require('../../config/env/index');
const authMethod = require('../api/helpers/jwt');
const {isJwtExpired} = require('jwt-check-expiration');

const isAuth = async(req, res, next) => {
	try {
		const pathName = req._parsedUrl.pathname;
		const accessTokenFromHeader = req.token;
		if (!accessTokenFromHeader) {
			return res.json(rsError(401, constants.NOT_FIND_ACCESS_TOKEN));
		}
		const accessTokenSecret = config.ACCESS_TOKEN_SECRET;
		const verified = await authMethod.verifyToken(
			accessTokenFromHeader,
			accessTokenSecret,
		);
		if (!verified) {
			return res.json(rsErrorUnauthorized());
		}
		if(isJwtExpired(accessTokenFromHeader))
			return res.json(rsErrorTokenExpired());
		const jwtDecode = await authMethod.decodedToken(accessTokenFromHeader, accessTokenSecret);
		req.jwtDecode = jwtDecode.payload;
		const listAction = jwtDecode.payload.action;
		console.log({pathName, listAction})
		next();
	} catch (error) {
		return res.json(rsErrorInvalid());
	}
    // }
    //console.log('token: ', req.token);
	// Lấy access token từ header
	// return next();
};

const isAuthCookie = async(req, res, next) => {
	try {
		const cookie = req.cookies.token;
		//console.log('cookies: ', cookie)
		if (!cookie) {
			return res.redirect('/login');
		}
		if(isJwtExpired(cookie))
		{
			req.isJwtExpired = constants.TOKEN_EXPIRED;
			return res.redirect('/login');
			//return next();
		}
		const accessTokenSecret = config.ACCESS_TOKEN_SECRET;
		const verified = await authMethod.verifyToken(
			cookie,
			accessTokenSecret,
		);
		if (!verified) {
			return res.json(rsErrorUnauthorized());
		}
		
		const jwtDecode = await authMethod.decodedToken(cookie, accessTokenSecret);
		req.jwtDecode = jwtDecode.payload;
		next();
	} catch (error) {
		return res.json(rsErrorInvalid());
	}
};

module.exports = {
    isAuth,
	isAuthCookie
};