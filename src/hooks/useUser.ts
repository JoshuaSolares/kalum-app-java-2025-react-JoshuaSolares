import type { AppDispath, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux"
import {userService} from '../services/userService';


export const useUser = () => {
    const {users} = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispath>();

    const getUsers = async () => {
        const response = await userService.findAll();
        return response; 
    }
    
    return {
        getUsers
    }
}   