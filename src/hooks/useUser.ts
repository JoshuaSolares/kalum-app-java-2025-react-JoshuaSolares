import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux"
import {userService} from '../services/userService';
import { loadingUsers, addUser, removeUser } from '../store/slices/users/usersSlice';


export const useUser = () => {
    const {users} = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();

    const getUsers = async () => {
        const response = await userService.findAll();  
        dispatch(loadingUsers(response.data))
    }

    const createUser = async (user: any) => {
        const response = await userService.save(user);
        dispatch(addUser({id: response.data.id, fullName: `${user.lastname} ${user.firstname}`,identityUser: 0, ...user}));
        return response;
    }

    const deleteUser = async (id: string) => {
        const response = await userService.delete(id);
        if(response.status == 204) {
            dispatch(removeUser(id))
        }
        return response;
    }
    
    return {
        users,
        getUsers,
        createUser,
        deleteUser
    }
}   