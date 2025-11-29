import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserListDTO {
    id: string;
    username: string;
    fullName: string;
    email: string;
    phoneNumber: string;
}

export interface UserListResponse {
    success: boolean;
    message: string;
    data: UserListDTO[],
    error: string[]
}

export interface UsersState {
    users: UserListDTO[];
}

const initialState: UsersState = {
    users: []
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loadingUsers: (state, {payload}) => {
            state.users = payload;
        },
        addUser: (state, action: PayloadAction<UserListResponse>) => {
            const data:any = action.payload.data;
            const id = data.id;
            console.log(id);
            state.users = [...state.users];
        }
    }
});

export const {loadingUsers, addUser} = usersSlice.actions;

export default usersSlice.reducer;