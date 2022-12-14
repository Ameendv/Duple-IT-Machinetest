import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const signup = createAsyncThunk('auth/signup', async (user, thunkAPI) => {
    try {
        return await authService.signup(user)
    }
    catch (error) {
       
        
        const message = (error.response && error.response.data && error.response.data) || error.message || error.toString()
       
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
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
            .addCase(signup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
               
                 state.isLoading = false;
                    state.isSuccess = true;
                    state.user = action.payload

            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.user = null
            })

    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer


