import {useDispatch, useSelector} from 'react-redux'
import type { AppDispath, RootState } from '../store/store'
import { loginFailure, loginStart, loginSuccess, logout } from '../store/slices/auth/authSlice';
import { authService } from '../services/authService';


export const useAuth = () => {
    const {user,token,loading,error} = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispath>();
    
    const handlerLogin = async (username: string, password:string) => {
        dispatch(loginStart());
        try{
            const data = await authService.login(username,password);
            dispatch(loginSuccess(data));
        }catch(error: any) {
            dispatch(loginFailure(error.response?.data?.message ?? 'Error login'));
        }
    }

    const handlerLogout = () => {
        dispatch(logout());
    }

    return {
        user,
        token,
        loading,
        error,
        isAuthenticated: Boolean(token),
        login: handlerLogin,
        logout: handlerLogout
    }
} 