import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import streakService from './streakService'

const initialState = {
    streaks: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

export const createStreak = createAsyncThunk(
    'streaks/create',
    async (streakData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await streakService.createStreak(streakData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getStreaks = createAsyncThunk(
    'streaks/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await streakService.getStreaks(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


// Delete user goal
export const deleteStreak = createAsyncThunk(
    'streaks/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await streakService.deleteStreak(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const streakSlice = createSlice({
    name: 'streak',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createStreak.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createStreak.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.streaks.push(action.payload)
        })
        .addCase(createStreak.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getStreaks.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getStreaks.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.streaks = action.payload
        })
        .addCase(getStreaks.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(deleteStreak.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteStreak.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.streaks = state.streaks.filter(
            (streak) => streak._id !== action.payload.id
          )
        })
        .addCase(deleteStreak.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  })
  
  export const { reset } = streakSlice.actions
  export default streakSlice.reducer