const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail-service');
const TokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const legendmodel = require('../models/legendmodel'); 

class UserService{
    
    async registration(email, password){    
        const candidate = await User.findOne({email});
        if (candidate){
            throw ApiError.badRequest(`Пользователь с почтой ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 4);
        const activationLink = uuid.v4();       

        const user = await User.create({email, password: hashPassword, activationLink: activationLink});
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user); // id, email, isActivated

        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async login(email, password){
        const user = await User.findOne({email});
        if (user === null ){
            throw ApiError.badRequest(`Пользователя не существует`);
        }
        const isRightPass = await bcrypt.compare(password, user.password);

        if (!isRightPass){
            throw ApiError.badRequest(`Неверный пароль`);
        }
        const userDto = new UserDto(user);

        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async logout(refreshToken){
        return await TokenService.deleteToken(refreshToken);
    }

    async activate(activationLink){
        const user = await User.findOne({activationLink});
        if (!user){
            throw ApiError.badRequest('Uncorrect activation link');
        }
        user.isActivated = true;
        await user.save();
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.unauthorizedError();
        }

        const userData = TokenService.validateRefresh(refreshToken);
        const tokenFromDB = TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDB){
            throw ApiError.unauthorizedError();
        }
        const user = await User.findById(userData.id);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async getAllUsers(){
        const users = await User.find();
        return users;
    }

    async getLegends(){
        try{
            const legends = await legendmodel.find();
            return legends;
        }catch(e){
            console.log(e);
        }
    }

    async postLegends(body,copyright){
        try{
            const legend = await legendmodel.create({body, copyright});
            return legend;
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = new UserService();   
