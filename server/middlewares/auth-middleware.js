const ApiError = require('../exceptions/api-error');
const TokenService = require('../services/token-service');

module.exports = (req, res, next) => {
    try{
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader){
                return next(ApiError.unauthorizedError());
        } 
  
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken){
            return next(ApiError.unauthorizedError());  
        }

        const userData = TokenService.validateAccess(accessToken);

        if (!userData){
            return next(ApiError.unauthorizedError());
        }

        if(!userData.isActivated){
            return next(ApiError.unauthorizedError());
        }

        req.user = userData;
        next();

    }catch(e){
        return next(ApiError.unauthorizedError());
    }
   
   
}