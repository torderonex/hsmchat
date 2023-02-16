const Router = require('express');
const UserController = require('../controllers/user-controller');
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const router = Router()

//auth, login, etc
router.post('/registration',body('email').isEmail(), body('password').isLength({min:4,max:32}) ,UserController.registraton);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.acivate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware,UserController.getUsers);
// legends 
router.post('/postlegend',body('copyright').isLength({min:1,max:64}), body('body').isLength({min:0,max:512}), authMiddleware, UserController.postLegend);
router.get('/getlegends',UserController.getLegends);
//posts

module.exports = router;    
