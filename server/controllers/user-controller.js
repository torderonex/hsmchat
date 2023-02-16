const UserService = require('../services/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const userService = require('../services/user-service');

class UserController{

    async registraton(req,res,next){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return next(ApiError.badRequest('Ошибка при регистрации', errors.array()));
            }              
            
            const {email, password} = req.body;

            const userData = await UserService.registration(email,password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req,res,next){
        try{
            const {email, password} = req.body;
            const userData = await UserService.login(email,password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req,res,next){
        try{
              const {refreshToken} = req.cookies;
              const token = await UserService.logout(refreshToken);
              res.clearCookie('refreshToken');
              return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async acivate(req,res,next){
        try{
              const activationLink = req.params.link;
              await UserService.activate(activationLink);
              return res.redirect(process.env.CLIENT_URL + '/login');
        } catch (e) {
            next(e);
        }
    }


    async refresh(req,res,next){
        try{
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req,res,next){
        try{
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getLegends(req,res,next){
        try{
            const legends = await userService.getLegends();
            return res.json(legends);
        }catch(e){
            next(e);
        }
    }

    async postLegend(req,res,next){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return next(ApiError.badRequest('Ошибка при публикации легенды', errors.array()));
            }         
            const {body, copyright} = req.body;
            const legendData = await userService.postLegends(body,copyright);
            return res.json(legendData);
        }catch(e){
            next(e);
        }
    }
}



const controller = new UserController();

module.exports = controller;

