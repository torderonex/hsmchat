import { useEffect, useContext, useState } from "react";
import { Context } from './index';
import {observer} from 'mobx-react-lite';
import UserService from './service/UserService';

function App() {

  const {store} = useContext(Context);
  const [users,setUsers] = useState([]);

  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth();
    }
  },);

  const getUsers = async () => {
    try{
      const response = await UserService.fetchUsers();
      setUsers(response.data)
    }catch(e){
      console.log(e)
    }
  }

 
}

export default observer(App);
