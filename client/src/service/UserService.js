import $api from "../http";

export default class UserService{
    static async fetchUsers(){
        return $api.get('/users');
    }

    static async fetchLegends(){
        return $api.get('/getlegends');
    }

    static async postLegend(body, copyright){
        return $api.post('/postlegend',{body, copyright});
    }
}