
import axios from 'axios';
import {makeAutoObservable} from 'mobx';
import { API_URL } from '../http';
import AuthService from '../service/AuthService';
import UserService from '../service/UserService';

export default class Store{

        /*

        A U T H 
        S T O R E

        */

    user = {};
    isAuth = false;
    isLoading = false;

    constructor(){
        makeAutoObservable(this);
    }

    setLoading(bool){
        this.isLoading = bool;
    }

    setAuth(bool){
        this.isAuth = bool;
    }

    setUser(user){
        this.user = user;
    }

    async login(email, password){
        try{
            const response = await AuthService.login(email, password);
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch(e){
            console.log(e);
        }
    }

    async registration(email, password){
        try{
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response;
        }catch(e){
            console.log(e);
        }
    }

    async logout(){
        try{
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});

        }catch(e){
            console.log(e);
        }
    }

    async checkAuth(){
        this.setLoading(true);
        try{
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true,});
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch(e){
            console.log(e);
        }finally{
            this.setLoading(false);
        }
    }

        /*

        L E G E N D
        S T O R E

        */
    
    legends  = [];

    setLegend(arr){
        this.legends = arr;
    }

    async addLegend(body, copyright){
        try{
            const response = await UserService.postLegend(body, copyright);
            return response;
        }catch(e){
            console.log(e);
        }
    }

    async getLegends(){
        try{
            const response = await UserService.fetchLegends();
            this.setLegend(response.data);
            return this.legends;
        }catch(e){
            console.log(e);
        }
    }

}

