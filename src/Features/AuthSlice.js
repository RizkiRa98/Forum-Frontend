import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// State awal jika belum login
const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Koneksi ke API backend
// Method Login
export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkApi) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

// method Get User yang sedang login
export const GetUserLogin = createAsyncThunk(
  "user/GetUserLogin",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("http://localhost:5000/userLogin");
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

// Method Logout
export const Logout = createAsyncThunk("user/Logout", async () => {
  await axios.get("http://localhost:5000/logout");
});

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Reducer Login
    // Jika UserLogin Pending
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    // JIka UserLogin Berhasil
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    // Jika UserLogin Gagal
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Reducer Get User Login
    // Jika GetUserLogin Pending
    builder.addCase(GetUserLogin.pending, (state) => {
      state.isLoading = true;
    });
    // JIka GetUserLogin Berhasil
    builder.addCase(GetUserLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    // Jika GetUserLogin Gagal
    builder.addCase(GetUserLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = AuthSlice.actions;
export default AuthSlice.reducer;
