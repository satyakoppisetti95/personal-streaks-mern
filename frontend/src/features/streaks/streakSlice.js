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
            if(!thunkAPI.getState().auth.user) { return []}
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

export const incrementStreak = createAsyncThunk(
    'streaks/increment',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await streakService.incrementStreak(id, token)
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
        .addCase(deleteStreak.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.streaks = state.streaks.filter(
            (streak) => streak._id !== action.payload._id
          )
        })
        .addCase(deleteStreak.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(incrementStreak.fulfilled, (state, action) => {
          state.streaks = state.streaks.map((streak) => {
            if (streak._id === action.payload._id) {
              return action.payload
            } else {
              return streak
            }
          })
        })
        .addCase(incrementStreak.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  })
  
  export const { reset } = streakSlice.actions
  export default streakSlice.reducer