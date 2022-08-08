exports.rsError = (ErrorCode, Message) => {
	return { ErrorCode, Message, Result: null }
}

exports.rsErrorUnauthorized = () => {
	return { ErrorCode: 401, Message: 'Unauthorized', Result: null }
}


exports.rsErrorTokenExpired = () => {
    return { ErrorCode: 401, Message: "Token expired !", Result: null };
  };

exports.rsErrorPermission = () => {
	return { ErrorCode: 400, Message: 'Permission denied', Result: null }
}

exports.rsErrorOperation = (error) => {
	return { ErrorCode: 402, Message: 'Error during operation ' + JSON.stringify(error), Result: error }
}


exports.rsErrorExist = () => {
	return { ErrorCode: 403, Message: 'Already exists', Result: null }
}

exports.rsErrorInvalid = (ms = "") => {
	return { ErrorCode: 403, Message: 'Invalid format ' + ms, Result: null }
}

exports.rsErrorCheckVersion = (Result = null) => {
	return { ErrorCode: 403, Message: 'Not new version', Result: Result }
}

exports.rsErrorNotFound = (ms = "") => {
	return { ErrorCode: 404, Message: 'Find not found ' + ms, Result: null }
}

exports.rsErrorInternalServer = (ms = "") => {
	return { ErrorCode: 500, Message: 'Internal Server Error ' + ms, Result: null }
}

exports.rsSuccess = (Result = null) => {
	return { ErrorCode: 0, Message: "Success", Result }
}
