import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authServiceLogin from './authServiceLogin'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authServiceLogin.login(user)
    }
    catch (error) {
       
        
        const message = (error.response && error.response.data && error.response.data) || error.message || error.toString()
       
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSliceLogin = createSlice({
    name: 'auth',   
    initialState,
    reducers: {
        reset: (state) => {
          state.isLoading = false
                state.isError = false
                state.isSuccess = false
                state.message = ''

        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
               
                 state.isLoading = false;
                    state.isSuccess = true;
                    state.user = action.payload

            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.user = null
            })

    }
})

export const { reset } = authSliceLogin.actions
export default authSliceLogin.reducer


