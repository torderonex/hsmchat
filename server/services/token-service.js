const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenmodel');

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWTSECRETACCESS,{expiresIn:'1h'});
        const refreshToken = jwt.sign(payload, process.env.JWTSECRETREFRESH, {expiresIn:'30d'})
        return {accessToken, refreshToken};
    }
    
    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user:   userId});
        if(tokenData !== null){
             tokenData.refreshToken = refreshToken;
             return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async deleteToken(refreshToken){
        const token = tokenModel.deleteOne({refreshToken});
        return token;
    }

    validateRefresh(refreshToken){
        try{
            const userData = jwt.verify(refreshToken, process.env.JWTSECRETREFRESH);
            return userData;
        }catch(e){
            return null;
        }
    }

    validateAccess(accessToken){
        try{
            const userData = jwt.verify(accessToken, process.env.JWTSECRETACCESS);

            return userData;
        }catch(e){
            return null;
        }
    }

    async findToken(refreshToken){
        try{
            const userData = await tokenModel.findOne({refreshToken});
            return userData;
        }catch(e){
            return null;
        }
    }
}

const Service = new TokenService();  

module.exports = Service;